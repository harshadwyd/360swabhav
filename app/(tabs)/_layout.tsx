import { Tabs } from 'expo-router';
import { Chrome as Home, ChartBar as BarChart3, Trophy, User, Plus, Users, TrendingUp, UserCheck, Settings } from 'lucide-react-native';
import { useUserRole } from '@/hooks/useUserRole';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const userRole = useUserRole();
  const [isReady, setIsReady] = useState(false);
  
  // Debug logging
  useEffect(() => {
    console.log('TabLayout - Current role:', userRole);
    
    // Longer delay to ensure role is properly set before rendering
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('TabLayout - Ready to render with role:', userRole);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [userRole]);

  // Don't render until we're ready to prevent flashing
  if (!isReady) {
    return null;
  }

  if (userRole === 'coach') {
    console.log('Rendering coach navigation');
    // Coach-only navigation
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarActiveTintColor: '#4ECDC4',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="coach-dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="students"
          options={{
            title: 'Students',
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="coach-analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ size, color }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: 'Tools',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        {/* Hide student-only tabs */}
        <Tabs.Screen
          name="index"
          options={{
            href: null, // This hides the tab
          }}
        />
        <Tabs.Screen
          name="track"
          options={{
            href: null, // This hides the tab
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            href: null, // This hides the tab
          }}
        />
        <Tabs.Screen
          name="achievements"
          options={{
            href: null, // This hides the tab
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            href: null, // This hides the tab
          }}
        />
        <Tabs.Screen
          name="community"
          options={{
            href: null, // This hides the tab
          }}
        />
      </Tabs>
    );
  }

  console.log('Rendering student navigation');
  // Student-only navigation (default)
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Track',
          tabBarIcon: ({ size, color }) => (
            <Plus size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ size, color }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      {/* Hide coach-only tabs */}
      <Tabs.Screen
        name="coach-dashboard"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="coach-analytics"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          href: null, // This hides the tab
        }}
      />
    </Tabs>
  );
}