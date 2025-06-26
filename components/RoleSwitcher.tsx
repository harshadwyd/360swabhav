import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import { UserRole, switchUserRole, useUserRole } from '@/hooks/useUserRole';

export default function RoleSwitcher() {
  const currentRole = useUserRole();

  const handleRoleSwitch = () => {
    const newRole: UserRole = currentRole === 'student' ? 'coach' : 'student';
    
    Alert.alert(
      'Switch Role',
      `Switch from ${currentRole} to ${newRole}? This will refresh the app.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Switch', 
          onPress: () => switchUserRole(newRole),
          style: 'default'
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.currentRole}>
        Current Role: <Text style={styles.roleHighlight}>{currentRole.toUpperCase()}</Text>
      </Text>
      <TouchableOpacity style={styles.switchButton} onPress={handleRoleSwitch}>
        <Text style={styles.switchText}>
          Switch to {currentRole === 'student' ? 'Coach' : 'Student'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        {currentRole === 'student' 
          ? 'Switch to Coach to see student management tools'
          : 'Switch to Student to see character development features'
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  currentRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  roleHighlight: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  switchButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 16,
  },
});