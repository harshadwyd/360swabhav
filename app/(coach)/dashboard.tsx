import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, TrendingUp, AlertTriangle, Trophy, MessageCircle, Calendar, Target, Star, ChevronRight, Bell, Award } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
}

interface CoachMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: any;
}

export default function CoachDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const coachStats = {
    totalStudents: 24,
    activeToday: 18,
    coachLevel: 7,
    coachXP: 2847,
    weeklyGoals: 15,
    completedGoals: 12,
  };

  const students: Student[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      level: 4,
      streak: 12,
      status: 'thriving',
      lastActive: '2 hours ago',
      completionRate: 92,
      avatar: '🌟'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      level: 2,
      streak: 3,
      status: 'needs-attention',
      lastActive: '1 day ago',
      completionRate: 67,
      avatar: '⚡'
    },
    {
      id: '3',
      name: 'Emma Davis',
      level: 5,
      streak: 21,
      status: 'thriving',
      lastActive: '30 minutes ago',
      completionRate: 95,
      avatar: '🏆'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      level: 1,
      streak: 0,
      status: 'struggling',
      lastActive: '3 days ago',
      completionRate: 34,
      avatar: '🎯'
    },
  ];

  const coachMetrics: CoachMetric[] = [
    {
      title: 'Student Retention',
      value: '94%',
      change: '+8%',
      trend: 'up',
      color: '#4ECDC4',
      icon: Users,
    },
    {
      title: 'Avg Progress Rate',
      value: '87%',
      change: '+12%',
      trend: 'up',
      color: '#FF6B6B',
      icon: TrendingUp,
    },
    {
      title: 'Goal Achievement',
      value: '89%',
      change: '+5%',
      trend: 'up',
      color: '#FFB347',
      icon: Target,
    },
    {
      title: 'Satisfaction Score',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      color: '#9B59B6',
      icon: Star,
    },
  ];

  const urgentAlerts = [
    {
      student: 'Alex Thompson',
      issue: 'No activity for 3 days',
      priority: 'high',
      action: 'Send check-in message',
    },
    {
      student: 'Mike Johnson',
      issue: 'Completion rate dropped 20%',
      priority: 'medium',
      action: 'Schedule 1-on-1 session',
    },
  ];

  const dailyTasks = [
    { task: 'Send daily motivation to all students', completed: true, xp: 10 },
    { task: 'Review struggling students progress', completed: false, xp: 25 },
    { task: 'Respond to student messages', completed: true, xp: 15 },
    { task: 'Update coaching notes', completed: false, xp: 20 },
    { task: 'Plan tomorrow\'s check-ins', completed: false, xp: 15 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'thriving': return '#00ff88';
      case 'needs-attention': return '#FFB347';
      case 'struggling': return '#FF6B6B';
      default: return '#95A5A6';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'thriving': return '🌟';
      case 'needs-attention': return '⚠️';
      case 'struggling': return '🚨';
      default: return '⭐';
    }
  };

  const handleStudentPress = (student: Student) => {
    Alert.alert(
      `${student.name} - Level ${student.level}`,
      `Streak: ${student.streak} days\nCompletion Rate: ${student.completionRate}%\nLast Active: ${student.lastActive}`,
      [
        { text: 'View Profile', onPress: () => console.log('View profile') },
        { text: 'Send Message', onPress: () => console.log('Send message') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleTaskToggle = (index: number) => {
    // Toggle task completion and award XP
    const task = dailyTasks[index];
    if (!task.completed) {
      Alert.alert('Task Complete!', `You earned ${task.xp} XP for completing: ${task.task}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.coachInfo}>
            <Text style={styles.greeting}>Good Morning, Coach!</Text>
            <Text style={styles.coachName}>Level {coachStats.coachLevel} Mentor • {coachStats.coachXP} XP</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{coachStats.totalStudents}</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{coachStats.activeToday}</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{coachStats.completedGoals}/{coachStats.weeklyGoals}</Text>
            <Text style={styles.statLabel}>Weekly Goals</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚨 Urgent Alerts</Text>
            <View style={styles.alertsContainer}>
              {urgentAlerts.map((alert, index) => (
                <TouchableOpacity key={index} style={styles.alertCard} activeOpacity={0.8}>
                  <View style={styles.alertHeader}>
                    <AlertTriangle size={20} color="#FF6B6B" />
                    <Text style={styles.alertStudent}>{alert.student}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: alert.priority === 'high' ? '#FF6B6B' : '#FFB347' }]}>
                      <Text style={styles.priorityText}>{alert.priority.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.alertIssue}>{alert.issue}</Text>
                  <Text style={styles.alertAction}>Suggested: {alert.action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Coach Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Coaching Impact</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.metricsContainer}>
              {coachMetrics.map((metric, index) => (
                <TouchableOpacity key={index} style={styles.metricCard} activeOpacity={0.8}>
                  <LinearGradient
                    colors={[metric.color + '20', metric.color + '10']}
                    style={styles.metricGradient}
                  >
                    <View style={styles.metricHeader}>
                      <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                        <metric.icon size={20} color={metric.color} />
                      </View>
                      <Text style={styles.metricChange}>{metric.change}</Text>
                    </View>
                    <Text style={styles.metricTitle}>{metric.title}</Text>
                    <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Daily Coaching Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Daily Coaching Tasks</Text>
          <View style={styles.tasksContainer}>
            {dailyTasks.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.taskCard, task.completed && styles.completedTask]}
                onPress={() => handleTaskToggle(index)}
                activeOpacity={0.8}
              >
                <View style={styles.taskContent}>
                  <View style={[styles.taskCheckbox, task.completed && styles.checkedBox]}>
                    {task.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.taskText, task.completed && styles.completedTaskText]}>
                    {task.task}
                  </Text>
                </View>
                <Text style={styles.taskXP}>+{task.xp} XP</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Students Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👥 My Students</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#4ECDC4" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.studentsGrid}>
            {students.map((student) => (
              <TouchableOpacity
                key={student.id}
                style={styles.studentCard}
                onPress={() => handleStudentPress(student)}
                activeOpacity={0.8}
              >
                <View style={styles.studentHeader}>
                  <Text style={styles.studentAvatar}>{student.avatar}</Text>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(student.status) }]} />
                </View>
                
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentLevel}>Level {student.level}</Text>
                
                <View style={styles.studentStats}>
                  <View style={styles.studentStat}>
                    <Text style={styles.statNumber}>{student.streak}</Text>
                    <Text style={styles.statText}>day streak</Text>
                  </View>
                  <View style={styles.studentStat}>
                    <Text style={styles.statNumber}>{student.completionRate}%</Text>
                    <Text style={styles.statText}>completion</Text>
                  </View>
                </View>
                
                <Text style={styles.lastActive}>{student.lastActive}</Text>
                
                <View style={styles.studentActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <MessageCircle size={16} color="#4ECDC4" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Calendar size={16} color="#FFB347" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
              <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.quickActionGradient}>
                <MessageCircle size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Send Bulk Message</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
              <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.quickActionGradient}>
                <Calendar size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Schedule Sessions</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
              <LinearGradient colors={['#9B59B6', '#8E44AD']} style={styles.quickActionGradient}>
                <Trophy size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Create Challenge</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
              <LinearGradient colors={['#FFB347', '#FF8C42']} style={styles.quickActionGradient}>
                <Award size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Award Badge</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  coachInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  coachName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -10,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  alertsContainer: {
    gap: 12,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  alertStudent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  alertIssue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  alertAction: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  metricCard: {
    width: width * 0.4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  metricGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00ff88',
  },
  metricTitle: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  tasksContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  completedTask: {
    backgroundColor: '#f8f9fa',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  taskText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskXP: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  studentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  studentCard: {
    width: (width - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentAvatar: {
    fontSize: 24,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  studentLevel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  studentStat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statText: {
    fontSize: 10,
    color: '#666',
  },
  lastActive: {
    fontSize: 10,
    color: '#999',
    marginBottom: 12,
  },
  studentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});