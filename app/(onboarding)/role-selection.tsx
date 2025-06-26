import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { User, UserCheck, Users, Settings, ChevronRight } from 'lucide-react-native';

export default function OnboardingRoleSelection() {
  const router = useRouter();
  const { userName } = useLocalSearchParams();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'I\'m building my character and developing positive habits',
      features: ['Gamified daily challenges', 'XP and level progression', 'Achievement badges', 'Mentor support'],
      icon: User,
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E53'],
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'I guide others in their character development journey',
      features: ['Professional dashboard', 'Student progress tracking', 'Impact analytics', 'Resource library'],
      icon: UserCheck,
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#44A08D'],
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'I support the community and help create positive environments',
      features: ['Community moderation', 'Peer support tools', 'Service tracking', 'Crisis assistance'],
      icon: Users,
      color: '#45B7D1',
      gradient: ['#45B7D1', '#3498DB'],
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'I manage the platform and oversee character development programs',
      features: ['System management', 'User oversight', 'Analytics dashboard', 'Program coordination'],
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
      Alert.alert('Please select a role', `${userName}, choose how you'll be using Swabhav360`);
      return;
    }
    
    router.push({
      pathname: '/(onboarding)/feature-tour',
      params: { userName, selectedRole }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.greeting}>Hi {userName}! 👋</Text>
              <Text style={styles.title}>Which describes you best?</Text>
              <Text style={styles.subtitle}>
                This helps us customize your Swabhav360 experience with the right tools and features for your role.
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
                          }
                        ]}>
                          {selectedRole === role.id && (
                            <View style={[styles.radioInner, { backgroundColor: '#FFFFFF' }]} />
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

                    <View style={styles.featuresContainer}>
                      <Text style={[
                        styles.featuresTitle,
                        selectedRole === role.id && { color: 'rgba(255, 255, 255, 0.9)' }
                      ]}>
                        Your features:
                      </Text>
                      {role.features.map((feature, index) => (
                        <Text 
                          key={index} 
                          style={[
                            styles.featureItem,
                            selectedRole === role.id && { color: 'rgba(255, 255, 255, 0.8)' }
                          ]}
                        >
                          • {feature}
                        </Text>
                      ))}
                    </View>
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
                  Continue to Tour
                </Text>
                <ChevronRight size={20} color={selectedRole ? "#FFFFFF" : "rgba(255,255,255,0.3)"} />
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedRoleCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  roleGradient: {
    padding: 20,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 18,
    marginBottom: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
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