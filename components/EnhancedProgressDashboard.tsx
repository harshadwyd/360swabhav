import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Target, Calendar, Award, ChevronRight, ChartBar as BarChart3, Users, Zap } from 'lucide-react-native';
import ScrollableAnalytics from './ScrollableAnalytics';

const { width } = Dimensions.get('window');

interface ProgressDashboardProps {
  currentLevel: number;
  totalXP: number;
  weeklyGoals: number;
  completedGoals: number;
}

export default function EnhancedProgressDashboard({ 
  currentLevel, 
  totalXP, 
  weeklyGoals, 
  completedGoals 
}: ProgressDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', title: 'Overview', icon: BarChart3 },
    { id: 'analytics', title: 'Analytics', icon: TrendingUp },
    { id: 'goals', title: 'Goals', icon: Target },
    { id: 'social', title: 'Social', icon: Users },
  ];

  const progressStats = [
    {
      title: 'Character Level',
      value: `Level ${currentLevel}`,
      subtitle: `${totalXP.toLocaleString()} Total XP`,
      progress: 75,
      color: '#4ECDC4',
      trend: '+2 levels this month',
      icon: Award,
    },
    {
      title: 'Weekly Goals',
      value: `${completedGoals}/${weeklyGoals}`,
      subtitle: `${Math.round((completedGoals/weeklyGoals)*100)}% Complete`,
      progress: (completedGoals/weeklyGoals)*100,
      color: '#FF6B6B',
      trend: '+15% vs last week',
      icon: Target,
    },
    {
      title: 'Daily Streak',
      value: '12 Days',
      subtitle: 'Personal Best: 21 days',
      progress: 57,
      color: '#FFB347',
      trend: 'On fire! 🔥',
      icon: Zap,
    },
    {
      title: 'Community Rank',
      value: '#23',
      subtitle: 'Top 15% in your group',
      progress: 85,
      color: '#9B59B6',
      trend: '+5 positions',
      icon: Users,
    },
  ];

  const weeklyOverview = [
    { day: 'Mon', completed: true, points: 85 },
    { day: 'Tue', completed: true, points: 92 },
    { day: 'Wed', completed: true, points: 78 },
    { day: 'Thu', completed: true, points: 95 },
    { day: 'Fri', completed: false, points: 0 },
    { day: 'Sat', completed: false, points: 0 },
    { day: 'Sun', completed: false, points: 0 },
  ];

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      {/* Progress Stats */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statsScroll}
        contentContainerStyle={styles.statsContainer}
      >
        {progressStats.map((stat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.statCard}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[stat.color + '20', stat.color + '10']}
              style={styles.statGradient}
            >
              <View style={styles.statHeader}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statTrend}>{stat.trend}</Text>
              </View>
              
              <View style={styles.statContent}>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${stat.progress}%`,
                        backgroundColor: stat.color 
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(stat.progress)}%</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Weekly Overview */}
      <View style={styles.weeklySection}>
        <Text style={styles.sectionTitle}>This Week's Progress</Text>
        <View style={styles.weeklyGrid}>
          {weeklyOverview.map((day, index) => (
            <View
              key={index}
              style={[
                styles.dayCard,
                day.completed && styles.completedDay,
                index === 4 && styles.todayCard, // Friday is today
              ]}
            >
              <Text style={[
                styles.dayLabel,
                day.completed && styles.completedDayText,
                index === 4 && styles.todayText,
              ]}>
                {day.day}
              </Text>
              {day.completed && (
                <Text style={styles.dayPoints}>+{day.points}</Text>
              )}
              {index === 4 && !day.completed && (
                <Text style={styles.todayLabel}>Today</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.quickActionGradient}>
              <Target size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Set New Goal</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
            <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.quickActionGradient}>
              <BarChart3 size={24} color="#FFFFFF" />
              <Text style={styles.quickActionText}>View Analytics</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'analytics':
        return <ScrollableAnalytics />;
      case 'overview':
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabButtons}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  selectedTab === tab.id && styles.activeTab
                ]}
                onPress={() => setSelectedTab(tab.id)}
                activeOpacity={0.8}
              >
                <tab.icon 
                  size={18} 
                  color={selectedTab === tab.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'} 
                />
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.activeTabText
                ]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginBottom: 20,
  },
  tabButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    gap: 24,
  },
  statsScroll: {
    marginBottom: 4,
  },
  statsContainer: {
    paddingRight: 20,
    gap: 16,
  },
  statCard: {
    width: width * 0.7,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTrend: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
  },
  statContent: {
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 35,
    textAlign: 'right',
  },
  weeklySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    width: 40,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  completedDay: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderColor: '#00ff88',
  },
  todayCard: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderColor: '#FF6B6B',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  completedDayText: {
    color: '#00ff88',
  },
  todayText: {
    color: '#FF6B6B',
  },
  dayPoints: {
    fontSize: 10,
    fontWeight: '600',
    color: '#00ff88',
  },
  todayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  quickActionsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});