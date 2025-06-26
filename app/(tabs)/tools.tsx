import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Calendar, Trophy, Target, Users, Send, Mic, Camera, Award, ChevronRight, Download, Upload, Settings, FileText, Book, Zap, Lightbulb } from 'lucide-react-native';

interface Student {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

export default function CoachingToolsScreen() {
  const [selectedTool, setSelectedTool] = useState('messages');
  const [messageText, setMessageText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const tools = [
    { id: 'messages', title: 'Bulk Messages', icon: MessageCircle, color: '#4ECDC4' },
    { id: 'challenges', title: 'Create Challenge', icon: Trophy, color: '#FF6B6B' },
    { id: 'badges', title: 'Award Badges', icon: Award, color: '#FFB347' },
    { id: 'sessions', title: 'Schedule Sessions', icon: Calendar, color: '#9B59B6' },
    { id: 'resources', title: 'Resources', icon: Book, color: '#45B7D1' },
    { id: 'reports', title: 'Reports', icon: FileText, color: '#FF8C42' },
  ];

  const messageTemplates = [
    {
      id: 1,
      title: 'Daily Motivation',
      content: 'Great job on your progress today! Remember, every small step counts toward building strong character. Keep up the amazing work! 🌟',
    },
    {
      id: 2,
      title: 'Weekly Check-in',
      content: 'How has your week been going? I\'m here to support you in your character development journey. Feel free to share any challenges or victories!',
    },
    {
      id: 3,
      title: 'Encouragement',
      content: 'I believe in you! Character building is a journey, not a destination. You\'re doing better than you think. Keep pushing forward! 💪',
    },
    {
      id: 4,
      title: 'Goal Reminder',
      content: 'Don\'t forget about your weekly goals! You\'re capable of achieving them. Break them down into smaller steps if needed. You\'ve got this!',
    },
  ];

  const students: Student[] = [
    { id: '1', name: 'Sarah Chen', avatar: '🌟', status: 'thriving' },
    { id: '2', name: 'Mike Johnson', avatar: '⚡', status: 'needs-attention' },
    { id: '3', name: 'Emma Davis', avatar: '🏆', status: 'thriving' },
    { id: '4', name: 'Alex Thompson', avatar: '🎯', status: 'struggling' },
    { id: '5', name: 'Jessica Wu', avatar: '💫', status: 'thriving' },
    { id: '6', name: 'David Rodriguez', avatar: '🔥', status: 'needs-attention' },
  ];

  const challengeTypes = [
    {
      id: 1,
      title: '7-Day Gratitude Challenge',
      description: 'Practice gratitude daily for a week',
      duration: '7 days',
      points: 100,
      difficulty: 'Easy',
    },
    {
      id: 2,
      title: '30-Day Consistency Challenge',
      description: 'Complete all daily tasks for 30 days',
      duration: '30 days',
      points: 500,
      difficulty: 'Hard',
    },
    {
      id: 3,
      title: 'Helping Hand Challenge',
      description: 'Help someone new each day for a week',
      duration: '7 days',
      points: 200,
      difficulty: 'Medium',
    },
    {
      id: 4,
      title: 'Team Building Challenge',
      description: 'Participate in group activities with peers',
      duration: '14 days',
      points: 300,
      difficulty: 'Medium',
    },
  ];

  const badges = [
    { id: 'helper', title: 'Helper of the Week', icon: '🤝', rarity: 'rare' },
    { id: 'consistent', title: 'Consistency Champion', icon: '🔥', rarity: 'epic' },
    { id: 'improver', title: 'Most Improved', icon: '📈', rarity: 'rare' },
    { id: 'leader', title: 'Natural Leader', icon: '👑', rarity: 'legendary' },
    { id: 'creative', title: 'Creative Thinker', icon: '🎨', rarity: 'rare' },
    { id: 'resilient', title: 'Resilience Master', icon: '🛡️', rarity: 'epic' },
  ];

  const resources = [
    { id: 1, title: 'Character Development Guide', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Weekly Reflection Templates', type: 'DOCX', size: '1.8 MB' },
    { id: 3, title: 'Goal Setting Framework', type: 'PDF', size: '3.1 MB' },
    { id: 4, title: 'Student Progress Tracker', type: 'XLSX', size: '1.2 MB' },
    { id: 5, title: 'Intervention Strategies', type: 'PDF', size: '4.5 MB' },
    { id: 6, title: 'Coaching Best Practices', type: 'PDF', size: '2.9 MB' },
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

    const selectedStudentNames = selectedStudents.map(id => 
      students.find(s => s.id === id)?.name
    ).join(', ');

    Alert.alert(
      'Message Sent!', 
      `Your message has been sent to ${selectedStudents.length} students: ${selectedStudentNames}`
    );
    
    setMessageText('');
    setSelectedStudents([]);
    setSelectedTemplate(null);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleTemplateSelect = (templateId: number) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessageText(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleCreateChallenge = (challengeId: number) => {
    const challenge = challengeTypes.find(c => c.id === challengeId);
    if (!challenge) return;

    Alert.alert(
      'Create Challenge',
      `Create "${challenge.title}" challenge?`,
      [
        { text: 'For All Students', onPress: () => Alert.alert('Challenge Created!', `${challenge.title} has been created for all students.`) },
        { text: 'For Selected Students', onPress: () => {
          if (selectedStudents.length === 0) {
            Alert.alert('No Students Selected', 'Please select students first.');
          } else {
            Alert.alert('Challenge Created!', `${challenge.title} has been created for ${selectedStudents.length} selected students.`);
          }
        }},
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAwardBadge = (badgeId: string) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return;

    Alert.alert(
      'Award Badge',
      `Award "${badge.title}" badge to a student?`,
      [
        { text: 'Select Student', onPress: () => {
          Alert.alert(
            'Select Student',
            'Choose a student to award this badge:',
            students.map(student => ({
              text: student.name,
              onPress: () => Alert.alert('Badge Awarded!', `${badge.title} badge has been awarded to ${student.name}!`),
            })).concat([{ text: 'Cancel', style: 'cancel' }])
          );
        }},
        { text: 'For Achievement', onPress: () => Alert.alert('Auto-Award Set Up', `${badge.title} badge will be automatically awarded to students who meet the criteria.`) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleResourceAction = (resourceId: number, action: 'view' | 'download' | 'share') => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    switch (action) {
      case 'view':
        Alert.alert('Opening Resource', `Opening ${resource.title} for viewing.`);
        break;
      case 'download':
        Alert.alert('Downloading', `Downloading ${resource.title} (${resource.size}).`);
        break;
      case 'share':
        Alert.alert(
          'Share Resource',
          `Share ${resource.title} with:`,
          [
            { text: 'All Students', onPress: () => Alert.alert('Shared!', `${resource.title} shared with all students.`) },
            { text: 'Selected Students', onPress: () => {
              if (selectedStudents.length === 0) {
                Alert.alert('No Students Selected', 'Please select students first.');
              } else {
                Alert.alert('Shared!', `${resource.title} shared with ${selectedStudents.length} selected students.`);
              }
            }},
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
    }
  };

  const handleUploadResource = () => {
    Alert.alert(
      'Upload Resource',
      'What type of resource would you like to upload?',
      [
        { text: 'Document', onPress: () => Alert.alert('Upload Started', 'Document upload initiated.') },
        { text: 'Image', onPress: () => Alert.alert('Upload Started', 'Image upload initiated.') },
        { text: 'Video', onPress: () => Alert.alert('Upload Started', 'Video upload initiated.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleScheduleSession = (type: string) => {
    Alert.alert(
      'Schedule Session',
      `Schedule a ${type} session:`,
      [
        { text: 'Individual Session', onPress: () => {
          Alert.alert(
            'Select Student',
            'Choose a student for this session:',
            students.map(student => ({
              text: student.name,
              onPress: () => Alert.alert('Session Scheduled!', `${type} session with ${student.name} has been scheduled.`),
            })).concat([{ text: 'Cancel', style: 'cancel' }])
          );
        }},
        { text: 'Group Session', onPress: () => Alert.alert('Group Session', 'Group session scheduling form opened.') },
        { text: 'Cancel', style: 'cancel' },
      ]
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
            {messageTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id && styles.selectedTemplateCard
                ]}
                onPress={() => handleTemplateSelect(template.id)}
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
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={() => Alert.alert('Voice Recording', 'Voice recording started. Speak your message.')}
          >
            <Mic size={20} color="#4ECDC4" />
            <Text style={styles.actionButtonText}>Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.photoButton}
            onPress={() => Alert.alert('Add Photo', 'Photo selection opened.')}
          >
            <Camera size={20} color="#FFB347" />
            <Text style={styles.actionButtonText}>Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Student Selection */}
      <View style={styles.studentsSection}>
        <View style={styles.subsectionHeader}>
          <Text style={styles.subsectionTitle}>Select Recipients:</Text>
          <TouchableOpacity 
            style={styles.selectAllButton}
            onPress={() => {
              if (selectedStudents.length === students.length) {
                setSelectedStudents([]);
              } else {
                setSelectedStudents(students.map(s => s.id));
              }
            }}
          >
            <Text style={styles.selectAllText}>
              {selectedStudents.length === students.length ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>
        </View>
        
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
              <Text style={styles.studentAvatar}>{student.avatar}</Text>
              <Text style={[
                styles.studentChipText,
                selectedStudents.includes(student.id) && styles.selectedStudentChipText
              ]}>
                {student.name}
              </Text>
              <View style={[
                styles.statusDot,
                { backgroundColor: student.status === 'thriving' ? '#00ff88' : 
                                 student.status === 'needs-attention' ? '#FFB347' : '#FF6B6B' }
              ]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Send Button */}
      <TouchableOpacity 
        style={[
          styles.sendButton,
          (!messageText.trim() || selectedStudents.length === 0) && styles.disabledButton
        ]} 
        onPress={handleSendMessage}
        disabled={!messageText.trim() || selectedStudents.length === 0}
      >
        <LinearGradient 
          colors={(!messageText.trim() || selectedStudents.length === 0) ? 
            ['#cccccc', '#aaaaaa'] : ['#4ECDC4', '#44A08D']} 
          style={styles.sendButtonGradient}
        >
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
        {challengeTypes.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={styles.challengeCard}
            onPress={() => handleCreateChallenge(challenge.id)}
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
            <TouchableOpacity 
              style={styles.createChallengeButton}
              onPress={() => handleCreateChallenge(challenge.id)}
            >
              <Text style={styles.createChallengeText}>Create Challenge</Text>
              <ChevronRight size={16} color="#4ECDC4" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.customButton}
        onPress={() => Alert.alert('Custom Challenge', 'Create a custom challenge with your own parameters.')}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.customButtonGradient}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.customButtonText}>Create Custom Challenge</Text>
        </LinearGradient>
      </TouchableOpacity>
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
            onPress={() => handleAwardBadge(badge.id)}
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
            <TouchableOpacity 
              style={styles.awardButton}
              onPress={() => handleAwardBadge(badge.id)}
            >
              <Text style={styles.awardButtonText}>Award Badge</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.customButton}
        onPress={() => Alert.alert('Custom Badge', 'Create a custom badge with your own design and criteria.')}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.customButtonGradient}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.customButtonText}>Create Custom Badge</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderSessionsTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Schedule Sessions</Text>
      
      <View style={styles.sessionsGrid}>
        <TouchableOpacity 
          style={styles.sessionCard}
          onPress={() => handleScheduleSession('One-on-One')}
        >
          <View style={[styles.sessionIcon, { backgroundColor: '#4ECDC420' }]}>
            <Users size={32} color="#4ECDC4" />
          </View>
          <Text style={styles.sessionTitle}>One-on-One Session</Text>
          <Text style={styles.sessionDescription}>
            Individual coaching session with a student to provide personalized guidance and support.
          </Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => handleScheduleSession('One-on-One')}
          >
            <Text style={styles.scheduleButtonText}>Schedule</Text>
            <Calendar size={16} color="#4ECDC4" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sessionCard}
          onPress={() => handleScheduleSession('Group')}
        >
          <View style={[styles.sessionIcon, { backgroundColor: '#FF6B6B20' }]}>
            <Users size={32} color="#FF6B6B" />
          </View>
          <Text style={styles.sessionTitle}>Group Session</Text>
          <Text style={styles.sessionDescription}>
            Collaborative session with multiple students to foster teamwork and shared learning.
          </Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => handleScheduleSession('Group')}
          >
            <Text style={styles.scheduleButtonText}>Schedule</Text>
            <Calendar size={16} color="#4ECDC4" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sessionCard}
          onPress={() => handleScheduleSession('Emergency')}
        >
          <View style={[styles.sessionIcon, { backgroundColor: '#FFB34720' }]}>
            <Zap size={32} color="#FFB347" />
          </View>
          <Text style={styles.sessionTitle}>Emergency Session</Text>
          <Text style={styles.sessionDescription}>
            Urgent support session for students who need immediate assistance or intervention.
          </Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => handleScheduleSession('Emergency')}
          >
            <Text style={styles.scheduleButtonText}>Schedule</Text>
            <Calendar size={16} color="#4ECDC4" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sessionCard}
          onPress={() => handleScheduleSession('Workshop')}
        >
          <View style={[styles.sessionIcon, { backgroundColor: '#9B59B620' }]}>
            <Lightbulb size={32} color="#9B59B6" />
          </View>
          <Text style={styles.sessionTitle}>Skill Workshop</Text>
          <Text style={styles.sessionDescription}>
            Educational workshop focused on developing specific character traits or skills.
          </Text>
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => handleScheduleSession('Workshop')}
          >
            <Text style={styles.scheduleButtonText}>Schedule</Text>
            <Calendar size={16} color="#4ECDC4" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResourcesTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Coaching Resources</Text>
      
      <View style={styles.resourcesContainer}>
        {resources.map((resource) => (
          <View key={resource.id} style={styles.resourceCard}>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceType}>{resource.type}</Text>
                <Text style={styles.resourceSize}>{resource.size}</Text>
              </View>
            </View>
            <View style={styles.resourceActions}>
              <TouchableOpacity 
                style={styles.resourceAction}
                onPress={() => handleResourceAction(resource.id, 'view')}
              >
                <Text style={styles.resourceActionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.resourceAction}
                onPress={() => handleResourceAction(resource.id, 'download')}
              >
                <Download size={16} color="#4ECDC4" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.resourceAction}
                onPress={() => handleResourceAction(resource.id, 'share')}
              >
                <Send size={16} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.customButton}
        onPress={handleUploadResource}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.customButtonGradient}>
          <Upload size={20} color="#FFFFFF" />
          <Text style={styles.customButtonText}>Upload New Resource</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderReportsTool = () => (
    <View style={styles.toolContent}>
      <Text style={styles.toolTitle}>Generate Reports</Text>
      
      <View style={styles.reportsGrid}>
        <TouchableOpacity 
          style={styles.reportCard}
          onPress={() => Alert.alert('Student Progress Report', 'Generating student progress report...')}
        >
          <TrendingUp size={32} color="#4ECDC4" />
          <Text style={styles.reportTitle}>Student Progress</Text>
          <Text style={styles.reportDescription}>
            Comprehensive report on individual student progress and achievements.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reportCard}
          onPress={() => Alert.alert('Group Performance Report', 'Generating group performance report...')}
        >
          <Users size={32} color="#FF6B6B" />
          <Text style={styles.reportTitle}>Group Performance</Text>
          <Text style={styles.reportDescription}>
            Comparative analysis of student groups and overall performance metrics.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reportCard}
          onPress={() => Alert.alert('Intervention Effectiveness', 'Generating intervention effectiveness report...')}
        >
          <Target size={32} color="#FFB347" />
          <Text style={styles.reportTitle}>Intervention Effectiveness</Text>
          <Text style={styles.reportDescription}>
            Analysis of coaching interventions and their impact on student outcomes.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.reportCard}
          onPress={() => Alert.alert('Coaching Impact Report', 'Generating coaching impact report...')}
        >
          <Award size={32} color="#9B59B6" />
          <Text style={styles.reportTitle}>Coaching Impact</Text>
          <Text style={styles.reportDescription}>
            Summary of your coaching effectiveness and overall student improvement.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.customButton}
        onPress={() => Alert.alert('Custom Report', 'Create a custom report with specific parameters and metrics.')}
      >
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.customButtonGradient}>
          <Settings size={20} color="#FFFFFF" />
          <Text style={styles.customButtonText}>Create Custom Report</Text>
        </LinearGradient>
      </TouchableOpacity>
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
      case 'sessions':
        return renderSessionsTool();
      case 'resources':
        return renderResourcesTool();
      case 'reports':
        return renderReportsTool();
      default:
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Select a Tool</Text>
            <Text style={styles.comingSoonText}>Please select a coaching tool from the options above.</Text>
          </View>
        );
    }
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
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    paddingRight: 24,
  },
  templateCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedTemplateCard: {
    borderColor: '#4ECDC4',
    borderWidth: 2,
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
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
    minHeight: 120,
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
    gap: 12,
    marginBottom: 12,
  },
  studentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 8,
  },
  selectedStudentChip: {
    backgroundColor: '#4ECDC420',
    borderColor: '#4ECDC4',
  },
  studentAvatar: {
    fontSize: 16,
  },
  studentChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedStudentChipText: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  selectAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  selectAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  sendButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
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
    marginBottom: 24,
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
    marginBottom: 16,
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
  createChallengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    gap: 8,
  },
  createChallengeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  customButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  customButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    marginBottom: 12,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  awardButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  awardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  sessionsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sessionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  sessionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    gap: 8,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  resourcesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  resourceMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  resourceType: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  resourceSize: {
    fontSize: 12,
    color: '#999',
  },
  resourceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  resourceAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  reportsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  reportDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});