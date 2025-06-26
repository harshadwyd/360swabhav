import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export type UserRole = 'student' | 'coach';

// Simple in-memory storage that works on all platforms
let currentRole: UserRole = 'student';
const roleChangeListeners: (() => void)[] = [];

// Safe localStorage wrapper for web
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.log('localStorage.getItem failed:', error);
        return null;
      }
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.log('localStorage.setItem failed:', error);
      }
    }
  }
};

// Initialize role from localStorage on web only
const initializeRole = () => {
  const savedRole = safeLocalStorage.getItem('userRole') as UserRole;
  if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
    currentRole = savedRole;
    console.log('Initialized role from storage:', savedRole);
  } else {
    console.log('Using default role:', currentRole);
  }
};

// Initialize on module load
initializeRole();

// This hook manages user roles for both web and React Native
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>(() => {
    // Ensure we get the current role on hook initialization
    return getCurrentRole();
  });

  useEffect(() => {
    // Add listener for role changes
    const listener = () => {
      const newRole = getCurrentRole();
      console.log('Role change detected, updating to:', newRole);
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

  return role;
}

// Helper function to switch roles (works on both web and React Native)
export function switchUserRole(newRole: UserRole) {
  console.log(`Switching role from ${currentRole} to ${newRole}`);
  currentRole = newRole;
  
  // Save to localStorage on web
  safeLocalStorage.setItem('userRole', newRole);
  
  // Notify all listeners
  roleChangeListeners.forEach(listener => {
    try {
      listener();
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