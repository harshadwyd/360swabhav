import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { UserRole, switchUserRole, useUserRole } from '@/hooks/useUserRole';

export default function RoleSwitcher() {
  const currentRole = useUserRole();

  const handleRoleSwitch = () => {
    const newRole: UserRole = currentRole === 'student' ? 'coach' : 'student';
    switchUserRole(newRole);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.currentRole}>Current Role: {currentRole}</Text>
      <TouchableOpacity style={styles.switchButton} onPress={handleRoleSwitch}>
        <Text style={styles.switchText}>
          Switch to {currentRole === 'student' ? 'Coach' : 'Student'}
        </Text>
      </TouchableOpacity>
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
});