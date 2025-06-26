import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CoachingTools from '@/components/CoachingTools';

export default function CoachingToolsScreen() {
  const handleSendBulkMessage = (message: string, recipients: string[]) => {
    console.log('Sending bulk message:', message, 'to:', recipients);
  };

  const handleCreateChallenge = (challenge: any) => {
    console.log('Creating challenge:', challenge);
  };

  const handleAwardBadge = (studentId: string, badge: any) => {
    console.log('Awarding badge:', badge, 'to student:', studentId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Coaching Tools</Text>
        <Text style={styles.headerSubtitle}>Powerful tools to support your students</Text>
      </LinearGradient>

      <CoachingTools
        onSendBulkMessage={handleSendBulkMessage}
        onCreateChallenge={handleCreateChallenge}
        onAwardBadge={handleAwardBadge}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});