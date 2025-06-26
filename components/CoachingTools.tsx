import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Calendar, Trophy, Target, Users, Send, Mic, Camera, Award } from 'lucide-react-native';

interface CoachingToolsProps {
  onSendBulkMessage: (message: string, recipients: string[]) => void;
  onCreateChallenge: (challenge: any) => void;
  onAwardBadge: (studentId: string, badge: any) => void;
}

export default function CoachingTools({ onSendBulkMessage, onCreateChallenge, onAwardBadge }: CoachingToolsProps) {
  const [selectedTool, setSelectedTool] = useState('messages');
  const [messageText, setMessageText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const tools = [
    { id: 'messages', title: 'Bulk Messages', icon: MessageCircle, color: '#4ECDC4' },
    { id: 'challenges', title: 'Create Challenge', icon: Trophy, color: '#FF6B6B' },
    { id: 'badges', title: 'Award Badges', icon: Award, color: '#FFB347' },
    { id: 'sessions', title: 'Schedule Sessions', icon: Calendar, color: '#9B59B6' },
  ];

  const messageTemplates = [
    {
      title: 'Daily Motivation',
      content: 'Great job on your progress today! Remember, every small step counts toward building strong character. Keep up the amazing work! 🌟',
    },
    {
      title: 'Weekly Check-in',
      content: 'How has your week been going? I\'m here to support you in your character development journey. Feel free to share any challenges or victories!',
    },
    {
      title: 'Encouragement',
      content: 'I believe in you! Character building is a journey, not a destination. You\'re doing better than you think. Keep pushing forward! 💪',
    },
    {
      title: 'Goal Reminder',
      content: 'Don\'t forget about your weekly goals! You\'re capable of achieving them. Break them down into smaller steps if needed. You\'ve got this!',
    },
  ];

  const students = [
    { id: '1', name: 'Sarah Chen', status: 'thriving' },
    { id: '2', name: 'Mike Johnson', status: 'needs-attention' },
    { id: '3', name: 'Emma Davis', status: 'thriving' },
    { id: '4', name: 'Alex Thompson', status: 'struggling' },
  ];

  const challengeTypes = [
    {
      title: '7-Day Gratitude Challenge',
      description: 'Practice gratitude daily for a week',
      duration: '7 days',
      points: 100,
      difficulty: 'Easy',
    },
    {
      title: '30-Day Consistency Challenge',
      description: 'Complete all daily tasks for 30 days',
      duration: '30 days',
      points: 500,
      difficulty: 'Hard',
    },
    {
      title: 'Helping Hand Challenge',
      description: 'Help someone new each day for a week',
      duration: '7 days',
      points: 200,
      difficulty: 'Medium',
    },
  ];

  const badges = [
    { id: 'helper', title: 'Helper of the Week', icon: '🤝', rarity: 'rare' },
    { id: 'consistent', title: 'Consistency Champion', icon: '🔥', rarity: 'epic' },
    { id: 'improver', title: 'Most Improved', icon: '📈', rarity: 'rare' },
    { id: 'leader', title: 'Natural Leader', icon: '👑', rarity: 'legendary' },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
    if (selectedStudents.length === 0) {
      Alert.alert('Error', 'Please select at least one student');
      return;
    }

    onSendBulkMessage(messageText, selectedStudents);
    Alert.alert('Success', `Message sent to ${selectedStudents.length} students!`);
    setMessageText('');
    setSelectedStudents([]);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const renderMessagingTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Send Bulk Message</Text>
      
      {/* Message Templates */}
      <View style={styles.templatesSection}>
        <Text style={styles.subsectionTitle}>Quick Templates:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templatesContainer}>
            {messageTemplates.map((template, index) => (
              <TouchableOpacity
                key={index}
                style={styles.templateCard}
                onPress={() => setMessageText(template.content)}
              >
                <Text style={styles.templateTitle}>{template.title}</Text>
                <Text style={styles.templatePreview} numberOfLines={2}>
                  {template.content}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Message Composer */}
      <View style={styles.composerSection}>
        <Text style={styles.subsectionTitle}>Compose Message:</Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Write your message here..."
          multiline
          numberOfLines={4}
          value={messageText}
          onChangeText={setMessageText}
        />
        
        <View style={styles.messageActions}>
          <TouchableOpacity style={styles.voiceButton}>
            <Mic size={20} color="#4ECDC4" />
            <Text style={styles.actionButtonText}>Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton}>
            <Camera size={20} color="#FFB347" />
            <Text style={styles.actionButtonText}>Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Student Selection */}
      <View style={styles.studentsSection}>
        <Text style={styles.subsectionTitle}>Select Recipients:</Text>
        <View style={styles.studentsGrid}>
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentChip,
                selectedStudents.includes(student.id) && styles.selectedStudentChip
              ]}
              onPress={() => toggleStudentSelection(student.id)}
            >
              <Text style={[
                styles.studentChipText,
                selectedStudents.includes(student.id) && styles.selectedStudentChipText
              ]}>
                {student.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.selectAllButton}
          onPress={() => setSelectedStudents(students.map(s => s.id))}
        >
          <Text style={styles.selectAllText}>Select All Students</Text>
        </TouchableOpacity>
      </View>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.sendButtonGradient}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.sendButtonText}>
            Send to {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderChallengeTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Create Challenge</Text>
      
      <View style={styles.challengesGrid}>
        {challengeTypes.map((challenge, index) => (
          <TouchableOpacity
            key={index}
            style={styles.challengeCard}
            onPress={() => {
              onCreateChallenge(challenge);
              Alert.alert('Challenge Created!', `${challenge.title} has been created for your students.`);
            }}
          >
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <View style={[
                styles.difficultyBadge,
                { backgroundColor: challenge.difficulty === 'Easy' ? '#4ECDC4' : 
                                 challenge.difficulty === 'Medium' ? '#FFB347' : '#FF6B6B' }
              ]}>
                <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
              </View>
            </View>
            <Text style={styles.challengeDescription}>{challenge.description}</Text>
            <View style={styles.challengeFooter}>
              <Text style={styles.challengeDuration}>{challenge.duration}</Text>
              <Text style={styles.challengePoints}>{challenge.points} points</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBadgeTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Award Badges</Text>
      
      <View style={styles.badgesGrid}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={styles.badgeCard}
            onPress={() => {
              Alert.alert(
                'Award Badge',
                `Award "${badge.title}" badge to a student?`,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Award', 
                    onPress: () => {
                      onAwardBadge('student1', badge);
                      Alert.alert('Badge Awarded!', `${badge.title} badge has been awarded!`);
                    }
                  },
                ]
              );
            }}
          >
            <Text style={styles.badgeIcon}>{badge.icon}</Text>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <View style={[
              styles.rarityBadge,
              { backgroundColor: badge.rarity === 'legendary' ? '#9B59B6' : 
                               badge.rarity === 'epic' ? '#FF6B6B' : '#4ECDC4' }
            ]}>
              <Text style={styles.rarityText}>{badge.rarity.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'messages':
        return renderMessagingTool();
      case 'challenges':
        return renderChallengeTool();
      case 'badges':
        return renderBadgeTool();
      default:
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>This tool is under development.</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Tool Selector */}
      <View style={styles.toolSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.toolButtons}>
            {tools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[
                  styles.toolButton,
                  selectedTool === tool.id && styles.selectedToolButton
                ]}
                onPress={() => setSelectedTool(tool.id)}
              >
                <tool.icon 
                  size={20} 
                  color={selectedTool === tool.id ? '#FFFFFF' : tool.color} 
                />
                <Text style={[
                  styles.toolButtonText,
                  selectedTool === tool.id && styles.selectedToolButtonText
                ]}>
                  {tool.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Tool Content */}
      <ScrollView style={styles.contentArea} showsVerticalScrollIndicator={false}>
        {renderToolContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  toolSelector: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toolButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 8,
  },
  selectedToolButton: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  toolButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedToolButtonText: {
    color: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
  },
  toolContent: {
    padding: 24,
  },
  toolTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  templatesSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  templatesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  templateCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  templatePreview: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  composerSection: {
    marginBottom: 24,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  messageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4ECDC420',
    borderRadius: 8,
    gap: 6,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFB34720',
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  studentsSection: {
    marginBottom: 24,
  },
  studentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  studentChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedStudentChip: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  studentChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedStudentChipText: {
    color: '#FFFFFF',
  },
  selectAllButton: {
    alignSelf: 'flex-start',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  sendButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  challengesGrid: {
    gap: 16,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeDuration: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  challengePoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});