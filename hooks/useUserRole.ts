import { useState, useEffect } from 'react';

export type UserRole = 'student' | 'coach';

// This hook would typically integrate with your authentication system
// For demo purposes, we'll use localStorage or a simple state management
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>('student');

  useEffect(() => {
    // In a real app, this would check authentication state
    // For demo, check localStorage for saved role
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('userRole') as UserRole;
      if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
        setRole(savedRole);
      }
    }
  }, []);

  return role;
}

// Helper function to switch roles (for demo purposes)
export function switchUserRole(newRole: UserRole) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', newRole);
    // Force a re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('roleChanged'));
    window.location.reload(); // Simple way to refresh navigation
  }
}