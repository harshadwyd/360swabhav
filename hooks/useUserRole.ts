import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export type UserRole = 'student' | 'coach';

// Simple in-memory storage for demo purposes
let currentRole: UserRole = 'student';
const roleChangeListeners: (() => void)[] = [];

// This hook manages user roles for both web and React Native
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>(currentRole);

  useEffect(() => {
    // Add listener for role changes
    const listener = () => {
      setRole(currentRole);
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
  
  // Notify all listeners
  roleChangeListeners.forEach(listener => listener());
  
  // For web, also update localStorage if available
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem('userRole', newRole);
    } catch (error) {
      console.log('localStorage not available, using in-memory storage');
    }
  }
}

// Helper function to get current role synchronously
export function getCurrentRole(): UserRole {
  // For web, try to get from localStorage first
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    try {
      const savedRole = window.localStorage.getItem('userRole') as UserRole;
      if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
        currentRole = savedRole;
        return savedRole;
      }
    } catch (error) {
      console.log('localStorage not available, using default role');
    }
  }
  
  return currentRole;
}

// Initialize role from localStorage on web
if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
  try {
    const savedRole = window.localStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
      currentRole = savedRole;
    }
  } catch (error) {
    console.log('localStorage not available, using default role');
  }
}