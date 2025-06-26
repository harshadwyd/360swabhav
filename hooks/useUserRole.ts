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

    // Listen for role changes
    const handleRoleChange = () => {
      if (typeof window !== 'undefined') {
        const savedRole = localStorage.getItem('userRole') as UserRole;
        if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
          setRole(savedRole);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('roleChanged', handleRoleChange);
      return () => window.removeEventListener('roleChanged', handleRoleChange);
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
    // Use a more reliable refresh method
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}

// Helper function to get current role synchronously (for initial render)
export function getCurrentRole(): UserRole {
  if (typeof window !== 'undefined') {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole && (savedRole === 'student' || savedRole === 'coach')) {
      return savedRole;
    }
  }
  return 'student';
}