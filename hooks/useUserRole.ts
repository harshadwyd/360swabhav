import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export type UserRole = 'student' | 'coach';

// Global state management that works on all platforms
let currentRole: UserRole = 'student';
let isInitialized = false;
const roleChangeListeners: ((role: UserRole) => void)[] = [];

// Safe storage wrapper that works on all platforms
const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.log('localStorage.getItem failed:', error);
        return null;
      }
    }
    // For React Native, we'll use in-memory storage
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.log('localStorage.setItem failed:', error);
      }
    }
    // For React Native, we just keep it in memory
  }
};

// Initialize role from storage
const initializeRole = async () => {
  if (isInitialized) return;
  
  try {
    const savedRole = await safeStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
      currentRole = savedRole;
      console.log('Initialized role from storage:', savedRole);
    } else {
      console.log('Using default role:', currentRole);
    }
  } catch (error) {
    console.log('Failed to initialize role from storage:', error);
  }
  
  isInitialized = true;
};

// This hook manages user roles for both web and React Native
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>(currentRole);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize role and then set up listener
    const setupRole = async () => {
      await initializeRole();
      setRole(currentRole);
      
      // Small delay to ensure role is properly set before rendering
      setTimeout(() => {
        setIsReady(true);
      }, 100);
    };

    setupRole();

    // Add listener for role changes
    const listener = (newRole: UserRole) => {
      console.log('Role change detected in hook, updating to:', newRole);
      setRole(newRole);
    };
    
    roleChangeListeners.push(listener);
    
    // Cleanup listener on unmount
    return () => {
      const index = roleChangeListeners.indexOf(listener);
      if (index > -1) {
        roleChangeListeners.splice(index, 1);
      }
    };
  }, []);

  // Return current role, but ensure we're ready
  return isReady ? role : currentRole;
}

// Helper function to switch roles (works on both web and React Native)
export function switchUserRole(newRole: UserRole) {
  console.log(`Switching role from ${currentRole} to ${newRole}`);
  currentRole = newRole;
  
  // Save to storage asynchronously
  safeStorage.setItem('userRole', newRole).catch(error => {
    console.log('Failed to save role to storage:', error);
  });
  
  // Notify all listeners immediately
  roleChangeListeners.forEach(listener => {
    try {
      listener(newRole);
    } catch (error) {
      console.error('Error in role change listener:', error);
    }
  });
}

// Helper function to get current role synchronously
export function getCurrentRole(): UserRole {
  return currentRole;
}

// Function to reset role to default (useful for testing)
export function resetRole() {
  switchUserRole('student');
}