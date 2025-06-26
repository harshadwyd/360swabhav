import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Users, TrendingUp, MessageCircle, Calendar, Trophy, Target, Star, ChevronRight, TriangleAlert as AlertTriangle, Plus, Download, Upload, SlidersHorizontal } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Student {
  id: string;
  name: string;
  level: number;
  streak: number;
  status: 'thriving' | 'needs-attention' | 'struggling';
  lastActive: string;
  completionRate: number;
  avatar: string;
  totalXP: number;
  weeklyGoals: number;
  completedGoals: number;
  badges: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function StudentsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  const students: Student[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      level: 4,
      streak: 12,
      status: 'thriving',
      lastActive: '2 hours ago',
      completionRate: 92,
      avatar: '🌟',
      totalXP: 1847,
      weeklyGoals: 8,
      completedGoals: 7,
      badges: 12,
      riskLevel: 'low',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      level: 2,
      streak: 3,
      status: 'needs-attention',
      lastActive: '1 day ago',
      completionRate: 67,
      avatar: '⚡',
      totalXP: 634,
      weeklyGoals: 6,
      completedGoals: 3,
      badges: 5,
      riskLevel: 'medium',
    },
    {
      id: '3',
      name: 'Emma Davis',
      level: 5,
      streak: 21,
      status: 'thriving',
      lastActive: '30 minutes ago',
      completionRate: 95,
      avatar: '🏆',
      totalXP: 2456,
      weeklyGoals: 10,
      completedGoals: 9,
      badges: 18,
      riskLevel: 'low',
    },
    {
      id: '4',
      name: 'Alex Thompson',
      level: 1,
      streak: 0,
      status: 'struggling',
      lastActive: '3 days ago',
      completionRate: 34,
      avatar: '🎯',
      totalXP: 156,
      weeklyGoals: 5,
      completedGoals: 1,
      badges: 2,
      riskLevel: 'high',
    },
    {
      id: '5',
      name: 'Jessica Wu',
      level: 3,
      streak: 8,
      status: 'thriving',
      lastActive: '1 hour ago',
      completionRate: 88,
      avatar: '💫',
      totalXP: 1234,
      weeklyGoals: 7,
      completedGoals: 6,
      badges: 9,
      riskLevel: 'low',
    },
    {
      id: '6',
      name: 'David Rodriguez',
      level: 2,
      streak: 1,
      status: 'needs-attention',
      lastActive: '2 days ago',
      completionRate: 58,
      avatar: '🔥',
      totalXP: 567,
      weeklyGoals: 6,
      completedGoals: 2,
      badges: 4,
      riskLevel: 'medium',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Students', count: students.length },
    { id: 'thriving', label: 'Thriving', count: students.filter(s => s.status === 'thriving').length },
    { id: 'needs-attention', label: 'Needs Attention', count: students.filter(s => s.status === 'needs-attention').length },
    { id: 'struggling', label: 'Struggling', count: students.filter(s => s.status === 'struggling').length },
    { id: 'high-risk', label: 'High Risk', count: students.filter(s => s.riskLevel === 'high').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'thriving': return '#00ff88';
      case 'needs-attention': return '#FFB347';
      case 'struggling': return '#FF6B6B';
      default: return '#95A5A6';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#00ff88';
      case 'medium': return '#FFB347';
      case 'high': return '#FF6B6B';
      default: return '#95A5A6';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'high-risk' ? student.riskLevel === 'high' : student.status === selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const handleStudentPress = (student: Student) => {
    if (isMultiSelectMode) {
      toggleStudentSelection(student.id);
    } else {
      setSelectedStudent(student);
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleMultiSelectMode = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    if (isMultiSelectMode) {
      setSelectedStudents([]);
    }
  };

  const handleSendMessage = (student: Student) => {
    Alert.alert(
      'Send Message',
      `Send a message to ${student.name}?`,
      [
        { text: 'Quick Encouragement', onPress: () => sendQuickMessage(student, 'encouragement') },
        { text: 'Check-in Message', onPress: () => sendQuickMessage(student, 'checkin') },
        { text: 'Custom Message', onPress: () => router.push('/tools') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleScheduleSession = (student: Student) => {
    Alert.alert(
      'Schedule Session',
      `Schedule a 1-on-1 session with ${student.name}?`,
      [
        { text: 'This Week', onPress: () => scheduleSession(student, 'this-week') },
        { text: 'Next Week', onPress: () => scheduleSession(student, 'next-week') },
        { text: 'Emergency Session', onPress: () => scheduleSession(student, 'emergency') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const sendQuickMessage = (student: Student, type: string) => {
    const messages = {
      encouragement: `Great job on your progress, ${student.name}! Keep up the amazing work! 🌟`,
      checkin: `Hi ${student.name}, just checking in on how you're doing. I'm here to support you! 💪`,
    };
    
    Alert.alert(
      'Message Sent!',
      `Sent to ${student.name}: "${messages[type as keyof typeof messages]}"`
    );
  };

  const scheduleSession = (student: Student, timing: string) => {
    const timingText = {
      'this-week': 'this week',
      'next-week': 'next week',
      'emergency': 'as an emergency session today',
    };
    
    Alert.alert(
      'Session Scheduled!',
      `1-on-1 session with ${student.name} scheduled for ${timingText[timing as keyof typeof timingText]}.`
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedStudents.length === 0) {
      Alert.alert('No Students Selected', 'Please select at least one student to perform this action.');
      return;
    }

    const selectedStudentNames = selectedStudents.map(id => 
      students.find(s => s.id === id)?.name
    ).join(', ');

    switch (action) {
      case 'message':
        Alert.alert(
          'Send Bulk Message',
          `Send a message to ${selectedStudents.length} students: ${selectedStudentNames}?`,
          [
            { text: 'Quick Encouragement', onPress: () => Alert.alert('Messages Sent!', `Encouragement messages sent to ${selectedStudents.length} students.`) },
            { text: 'Custom Message', onPress: () => router.push('/tools') },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case 'challenge':
        Alert.alert(
          'Create Group Challenge',
          `Create a challenge for ${selectedStudents.length} students?`,
          [
            { text: 'Weekly Challenge', onPress: () => Alert.alert('Challenge Created!', `Weekly challenge assigned to ${selectedStudents.length} students.`) },
            { text: 'Custom Challenge', onPress: () => router.push('/tools') },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        break;
      case 'export':
        Alert.alert('Data Exported!', `Progress data for ${selectedStudents.length} students has been exported.`);
        break;
      default:
        console.log('Unknown bulk action:', action);
    }
  };

  const handleAddStudent = () => {
    Alert.alert(
      'Add New Student',
      'How would you like to add a new student?',
      [
        { text: 'Send Invitation', onPress: () => Alert.alert('Invitation Sent!', 'Student invitation has been sent via email.') },
        { text: 'Generate Code', onPress: () => Alert.alert('Code Generated!', 'Student can join using code: COACH2024') },
        { text: 'Manual Entry', onPress: () => Alert.alert('Manual Entry', 'Manual student entry form opened.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAdvancedFilters = () => {
    Alert.alert(
      'Advanced Filters',
      'Filter students by:',
      [
        { text: 'Activity Level', onPress: () => setSelectedFilter('all') },
        { text: 'Progress Rate', onPress: () => setSelectedFilter('all') },
        { text: 'Goal Completion', onPress: () => setSelectedFilter('all') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderStudentDetail = () => {
    if (!selectedStudent) return null;

    return (
      <View style={styles.detailOverlay}>
        <TouchableOpacity 
          style={styles.detailBackdrop} 
          onPress={() => setSelectedStudent(null)}
        />
        <View style={styles.detailCard}>
          <LinearGradient
            colors={[getStatusColor(selectedStudent.status) + '20', getStatusColor(selectedStudent.status) + '10']}
            style={styles.detailHeader}
          >
            <View style={styles.detailHeaderContent}>
              <Text style={styles.detailAvatar}>{selectedStudent.avatar}</Text>
              <View style={styles.detailInfo}>
                <Text style={styles.detailName}>{selectedStudent.name}</Text>
                <Text style={styles.detailLevel}>Level {selectedStudent.level} • {selectedStudent.totalXP} XP</Text>
              </View>
              <View style={[styles.detailStatus, { backgroundColor: getStatusColor(selectedStudent.status) }]}>
                <Text style={styles.detailStatusText}>{selectedStudent.status.replace('-', ' ').toUpperCase()}</Text>
              </View>
            </View>
          </LinearGradient>

          <ScrollView style={styles.detailContent}>
            <View style={styles.detailStats}>
              <View style={styles.detailStatItem}>
                <Text style={styles.detailStatValue}>{selectedStudent.streak}</Text>
                <Text style={styles.detailStatLabel}>Day Streak</Text>
              </View>
              <View style={styles.detailStatItem}>
                <Text style={styles.detailStatValue}>{selectedStudent.completionRate}%</Text>
                <Text style={styles.detailStatLabel}>Completion</Text>
              </View>
              <View style={styles.detailStatItem}>
                <Text style={styles.detailStatValue}>{selectedStudent.badges}</Text>
                <Text style={styles.detailStatLabel}>Badges</Text>
              </View>
              <View style={styles.detailStatItem}>
                <Text style={styles.detailStatValue}>{selectedStudent.completedGoals}/{selectedStudent.weeklyGoals}</Text>
                <Text style={styles.detailStatLabel}>Goals</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Risk Assessment</Text>
              <View style={[styles.riskIndicator, { backgroundColor: getRiskColor(selectedStudent.riskLevel) + '20' }]}>
                <AlertTriangle size={20} color={getRiskColor(selectedStudent.riskLevel)} />
                <Text style={[styles.riskText, { color: getRiskColor(selectedStudent.riskLevel) }]}>
                  {selectedStudent.riskLevel.toUpperCase()} RISK
                </Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailSectionTitle}>Recent Activity</Text>
              <Text style={styles.lastActiveDetail}>Last active: {selectedStudent.lastActive}</Text>
              <Text style={styles.activityNote}>
                {selectedStudent.status === 'struggling' 
                  ? 'Student has been inactive for several days. Consider immediate intervention.'
                  : selectedStudent.status === 'needs-attention'
                  ? 'Completion rate has dropped recently. Schedule a check-in.'
                  : 'Student is performing well and staying engaged.'}
              </Text>
            </View>

            <View style={styles.detailActions}>
              <TouchableOpacity 
                style={styles.detailActionButton}
                onPress={() => handleSendMessage(selectedStudent)}
              >
                <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.detailActionGradient}>
                  <MessageCircle size={20} color="#FFFFFF" />
                  <Text style={styles.detailActionText}>Send Message</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.detailActionButton}
                onPress={() => handleScheduleSession(selectedStudent)}
              >
                <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.detailActionGradient}>
                  <Calendar size={20} color="#FFFFFF" />
                  <Text style={styles.detailActionText}>Schedule Session</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.detailActions}>
              <TouchableOpacity 
                style={styles.detailActionButton}
                onPress={() => {
                  setSelectedStudent(null);
                  Alert.alert('Analytics Opened', `Viewing detailed analytics for ${selectedStudent.name}`);
                }}
              >
                <LinearGradient colors={['#9B59B6', '#8E44AD']} style={styles.detailActionGradient}>
                  <TrendingUp size={20} color="#FFFFFF" />
                  <Text style={styles.detailActionText}>View Analytics</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.detailActionButton}
                onPress={() => {
                  setSelectedStudent(null);
                  Alert.alert('Badge Awarded', `Badge awarded to ${selectedStudent.name}`);
                }}
              >
                <LinearGradient colors={['#FFB347', '#FF8C42']} style={styles.detailActionGradient}>
                  <Trophy size={20} color="#FFFFFF" />
                  <Text style={styles.detailActionText}>Award Badge</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Students</Text>
        <Text style={styles.headerSubtitle}>Manage and support your student community</Text>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterActions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filtersContainer}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.id && styles.activeFilter
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.activeFilterText
                  ]}>
                    {filter.label} ({filter.count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.advancedFilterButton}
            onPress={handleAdvancedFilters}
          >
            <SlidersHorizontal size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Multi-select Mode Controls */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={[styles.actionButton, isMultiSelectMode && styles.activeActionButton]} 
          onPress={toggleMultiSelectMode}
        >
          <Text style={[styles.actionButtonText, isMultiSelectMode && styles.activeActionButtonText]}>
            {isMultiSelectMode ? 'Cancel Selection' : 'Select Multiple'}
          </Text>
        </TouchableOpacity>
        
        {isMultiSelectMode && (
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={styles.bulkActionButton}
              onPress={() => handleBulkAction('message')}
            >
              <MessageCircle size={16} color="#4ECDC4" />
              <Text style={styles.bulkActionText}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bulkActionButton}
              onPress={() => handleBulkAction('challenge')}
            >
              <Trophy size={16} color="#FF6B6B" />
              <Text style={styles.bulkActionText}>Challenge</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bulkActionButton}
              onPress={() => handleBulkAction('export')}
            >
              <Download size={16} color="#9B59B6" />
              <Text style={styles.bulkActionText}>Export</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {!isMultiSelectMode && (
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddStudent}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Selected Count */}
      {isMultiSelectMode && selectedStudents.length > 0 && (
        <View style={styles.selectionBar}>
          <Text style={styles.selectionText}>
            {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
          </Text>
          <TouchableOpacity 
            style={styles.selectAllButton}
            onPress={() => {
              if (selectedStudents.length === filteredStudents.length) {
                setSelectedStudents([]);
              } else {
                setSelectedStudents(filteredStudents.map(s => s.id));
              }
            }}
          >
            <Text style={styles.selectAllText}>
              {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Students List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.studentsContainer}>
          {filteredStudents.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentCard,
                isMultiSelectMode && selectedStudents.includes(student.id) && styles.selectedStudentCard
              ]}
              onPress={() => handleStudentPress(student)}
              activeOpacity={0.8}
            >
              <View style={styles.studentHeader}>
                <View style={styles.studentBasicInfo}>
                  <Text style={styles.studentAvatar}>{student.avatar}</Text>
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentLevel}>Level {student.level} • {student.totalXP} XP</Text>
                  </View>
                </View>
                <View style={styles.studentIndicators}>
                  {isMultiSelectMode ? (
                    <View style={[
                      styles.checkboxIndicator, 
                      selectedStudents.includes(student.id) && styles.checkedIndicator
                    ]}>
                      {selectedStudents.includes(student.id) && (
                        <Text style={styles.checkboxCheck}>✓</Text>
                      )}
                    </View>
                  ) : (
                    <>
                      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(student.status) }]} />
                      {student.riskLevel === 'high' && (
                        <AlertTriangle size={16} color="#FF6B6B" />
                      )}
                    </>
                  )}
                </View>
              </View>

              <View style={styles.studentMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{student.streak}</Text>
                  <Text style={styles.metricLabel}>Streak</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{student.completionRate}%</Text>
                  <Text style={styles.metricLabel}>Completion</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{student.badges}</Text>
                  <Text style={styles.metricLabel}>Badges</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>{student.completedGoals}/{student.weeklyGoals}</Text>
                  <Text style={styles.metricLabel}>Goals</Text>
                </View>
              </View>

              <View style={styles.studentFooter}>
                <Text style={styles.lastActive}>Last active: {student.lastActive}</Text>
                {!isMultiSelectMode && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity 
                      style={styles.quickActionBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleSendMessage(student);
                      }}
                    >
                      <MessageCircle size={16} color="#4ECDC4" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.quickActionBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleScheduleSession(student);
                      }}
                    >
                      <Calendar size={16} color="#FFB347" />
                    </TouchableOpacity>
                    <ChevronRight size={16} color="#999" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Student Detail Modal */}
      {renderStudentDetail()}
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
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#1a1a1a',
  },
  filterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersScroll: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  advancedFilterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeActionButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeActionButtonText: {
    color: '#FFFFFF',
  },
  bulkActions: {
    flexDirection: 'row',
    gap: 8,
  },
  bulkActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    gap: 6,
  },
  bulkActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  selectionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  selectAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  selectAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  studentsContainer: {
    paddingVertical: 16,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedStudentCard: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.05)',
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  studentBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentAvatar: {
    fontSize: 32,
    marginRight: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  studentLevel: {
    fontSize: 14,
    color: '#666',
  },
  studentIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkboxIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIndicator: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  checkboxCheck: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  studentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastActive: {
    fontSize: 12,
    color: '#999',
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  detailHeader: {
    padding: 20,
  },
  detailHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailAvatar: {
    fontSize: 40,
    marginRight: 16,
  },
  detailInfo: {
    flex: 1,
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  detailLevel: {
    fontSize: 16,
    color: '#666',
  },
  detailStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailContent: {
    flex: 1,
    padding: 20,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  detailStatItem: {
    alignItems: 'center',
  },
  detailStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  detailStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  riskIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  riskText: {
    fontSize: 14,
    fontWeight: '600',
  },
  lastActiveDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  activityNote: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  detailActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  detailActionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  detailActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});