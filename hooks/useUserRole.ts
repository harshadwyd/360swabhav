import { useState, useEffect } from 'react';

export type UserRole = 'student' | 'coach';

// This hook would typically integrate with your authentication system
// For demo purposes, we'll use localStorage or a simple state management
export function useUserRole(): UserRole {
  const [role, setRole] = useState<UserRole>('student');

  useEffect(() => {
    // In a real app, this would check authentication state
    // For demo, you can manually set the role here
    const savedRole = localStorage?.getItem('userRole') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return role;
}

// Helper function to switch roles (for demo purposes)
export function switchUserRole(newRole: UserRole) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', newRole);
    window.location.reload(); // Simple way to refresh navigation
  }
}