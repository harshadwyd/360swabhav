import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, UserCheck, Users, Settings } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'athlete',
      title: 'Athlete/Child',
      description: 'Track progress, earn rewards, and develop skills',
      icon: User,
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E53'],
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Manage athletes, create training plans, monitor progress',
      icon: UserCheck,
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#44A08D'],
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Support the community, participate in activities',
      icon: Users,
      color: '#45B7D1',
      gradient: ['#45B7D1', '#3498DB'],
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Complete system management and oversight',
      icon: Settings,
      color: '#9B59B6',
      gradient: ['#9B59B6', '#8E44AD'],
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert('Please select a role', 'Choose how you\'ll be using Swabhav360');
      return;
    }
    
    // Navigate to main app - this will start users at 0 points
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Choose Your Role</Text>
              <Text style={styles.subtitle}>
                Select how you'll be using the Swabhav360 platform
              </Text>
            </View>

            <View style={styles.rolesContainer}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.id}
                  style={[
                    styles.roleCard,
                    selectedRole === role.id && styles.selectedRoleCard
                  ]}
                  onPress={() => handleRoleSelect(role.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      selectedRole === role.id 
                        ? role.gradient
                        : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
                    }
                    style={styles.roleGradient}
                  >
                    <View style={styles.roleHeader}>
                      <View style={[
                        styles.roleIcon, 
                        { 
                          backgroundColor: selectedRole === role.id 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : role.color + '20',
                          borderColor: selectedRole === role.id 
                            ? 'rgba(255, 255, 255, 0.3)' 
                            : role.color
                        }
                      ]}>
                        <role.icon 
                          size={28} 
                          color={selectedRole === role.id ? '#FFFFFF' : role.color} 
                        />
                      </View>
                      <View style={styles.radioButton}>
                        <View style={[
                          styles.radioOuter,
                          selectedRole === role.id && { 
                            borderColor: '#FFFFFF',
                            borderWidth: 3,
                            shadowColor: role.color,
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.5,
                            shadowRadius: 8,
                            elevation: 8,
                          }
                        ]}>
                          {selectedRole === role.id && (
                            <View style={[
                              styles.radioInner, 
                              { 
                                backgroundColor: '#FFFFFF',
                                shadowColor: role.color,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.8,
                                shadowRadius: 4,
                                elevation: 4,
                              }
                            ]} />
                          )}
                        </View>
                      </View>
                    </View>
                    
                    <Text style={[
                      styles.roleTitle,
                      selectedRole === role.id && { color: '#FFFFFF' }
                    ]}>
                      {role.title}
                    </Text>
                    
                    <Text style={[
                      styles.roleDescription,
                      selectedRole === role.id && { color: 'rgba(255, 255, 255, 0.9)' }
                    ]}>
                      {role.description}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.continueButton,
                !selectedRole && styles.continueButtonDisabled
              ]} 
              onPress={handleContinue}
              disabled={!selectedRole}
            >
              <LinearGradient
                colors={
                  selectedRole 
                    ? ['#FF6B6B', '#4ECDC4']
                    : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                }
                style={styles.continueButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[
                  styles.continueButtonText,
                  !selectedRole && styles.continueButtonTextDisabled
                ]}>
                  Continue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: height,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 24,
  },
  rolesContainer: {
    flex: 1,
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ scale: 1 }],
  },
  selectedRoleCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  roleGradient: {
    padding: 4,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  radioButton: {
    marginLeft: 16,
  },
  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  roleDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});