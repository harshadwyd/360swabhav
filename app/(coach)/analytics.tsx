import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Users, Target, Award, Calendar, ChartBar as BarChart3, ChartPie as PieChart, Clock, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CoachAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [selectedMetric, setSelectedMetric] = useState('retention');

  const periods = ['Week', 'Month', 'Quarter', 'Year'];

  const coachingMetrics = [
    {
      id: 'retention',
      title: 'Student Retention',
      value: '94%',
      change: '+8%',
      trend: 'up',
      color: '#4ECDC4',
      description: 'Students staying active under your guidance',
    },
    {
      id: 'progress',
      title: 'Avg Progress Rate',
      value: '87%',
      change: '+12%',
      trend: 'up',
      color: '#FF6B6B',
      description: 'How quickly students advance levels',
    },
    {
      id: 'engagement',
      title: 'Engagement Score',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      color: '#FFB347',
      description: 'Student activity and participation',
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction Rating',
      value: '4.9/5',
      change: '+0.2',
      trend: 'up',
      color: '#9B59B6',
      description: 'Anonymous student feedback',
    },
  ];

  const weeklyData = [
    { day: 'Mon', students: 18, sessions: 5, messages: 12 },
    { day: 'Tue', students: 20, sessions: 7, messages: 15 },
    { day: 'Wed', students: 22, sessions: 6, messages: 18 },
    { day: 'Thu', students: 19, sessions: 8, messages: 14 },
    { day: 'Fri', students: 21, sessions: 4, messages: 16 },
    { day: 'Sat', students: 16, sessions: 3, messages: 8 },
    { day: 'Sun', students: 14, sessions: 2, messages: 6 },
  ];

  const studentDistribution = [
    { level: 'Level 1-2', count: 8, percentage: 33, color: '#FF6B6B' },
    { level: 'Level 3-4', count: 12, percentage: 50, color: '#4ECDC4' },
    { level: 'Level 5+', count: 4, percentage: 17, color: '#FFB347' },
  ];

  const interventionData = [
    { type: 'Check-in Messages', count: 45, success: 89 },
    { type: 'Scheduled Sessions', count: 28, success: 96 },
    { type: 'Crisis Support', count: 3, success: 100 },
    { type: 'Goal Adjustments', count: 15, success: 73 },
  ];

  const achievements = [
    {
      title: 'Mentor Master',
      description: 'Guided 10+ students to next level',
      earned: true,
      rarity: 'epic',
    },
    {
      title: 'Streak Keeper',
      description: 'Helped students maintain 30+ day streaks',
      earned: true,
      rarity: 'rare',
    },
    {
      title: 'Turnaround Specialist',
      description: 'Helped 5 struggling students recover',
      earned: false,
      rarity: 'legendary',
      progress: 60,
    },
  ];

  const insights = [
    {
      title: 'Peak Coaching Hours',
      description: 'Your students are most responsive between 6-8 PM',
      icon: Clock,
      color: '#4ECDC4',
    },
    {
      title: 'Intervention Success',
      description: 'Your early interventions have 94% success rate',
      icon: Target,
      color: '#00ff88',
    },
    {
      title: 'Student Growth',
      description: 'Students advance 40% faster under your guidance',
      icon: TrendingUp,
      color: '#FFB347',
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#00ff88';
      case 'down': return '#FF6B6B';
      default: return '#FFB347';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Coaching Analytics</Text>
        <Text style={styles.headerSubtitle}>Track your impact and effectiveness</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.periodButtons}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.selectedPeriod
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text style={[
                    styles.periodText,
                    selectedPeriod === period && styles.selectedPeriodText
                  ]}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Key Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            {coachingMetrics.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.metricCard,
                  selectedMetric === metric.id && styles.selectedMetricCard
                ]}
                onPress={() => setSelectedMetric(metric.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[metric.color + '20', metric.color + '10']}
                  style={styles.metricGradient}
                >
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricTitle}>{metric.title}</Text>
                    <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
                      {metric.change}
                    </Text>
                  </View>
                  <Text style={[styles.metricValue, { color: metric.color }]}>
                    {metric.value}
                  </Text>
                  <Text style={styles.metricDescription}>{metric.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Weekly Activity Overview</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
                <Text style={styles.legendText}>Active Students</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.legendText}>Sessions</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FFB347' }]} />
                <Text style={styles.legendText}>Messages</Text>
              </View>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chartContainer}>
                {weeklyData.map((data, index) => (
                  <View key={index} style={styles.chartDay}>
                    <View style={styles.barsContainer}>
                      <View 
                        style={[
                          styles.chartBar,
                          { 
                            height: (data.students / 25) * 80,
                            backgroundColor: '#4ECDC4'
                          }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.chartBar,
                          { 
                            height: (data.sessions / 10) * 60,
                            backgroundColor: '#FF6B6B'
                          }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.chartBar,
                          { 
                            height: (data.messages / 20) * 70,
                            backgroundColor: '#FFB347'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.dayLabel}>{data.day}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Student Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Student Level Distribution</Text>
          <View style={styles.distributionCard}>
            <View style={styles.distributionChart}>
              <PieChart size={80} color="#4ECDC4" />
              <Text style={styles.chartCenterText}>24 Students</Text>
            </View>
            <View style={styles.distributionLegend}>
              {studentDistribution.map((item, index) => (
                <View key={index} style={styles.distributionItem}>
                  <View style={[styles.distributionDot, { backgroundColor: item.color }]} />
                  <View style={styles.distributionInfo}>
                    <Text style={styles.distributionLevel}>{item.level}</Text>
                    <Text style={styles.distributionCount}>{item.count} students ({item.percentage}%)</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Intervention Effectiveness */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Intervention Effectiveness</Text>
          <View style={styles.interventionCard}>
            {interventionData.map((intervention, index) => (
              <View key={index} style={styles.interventionItem}>
                <View style={styles.interventionHeader}>
                  <Text style={styles.interventionType}>{intervention.type}</Text>
                  <Text style={styles.interventionSuccess}>{intervention.success}% success</Text>
                </View>
                <View style={styles.interventionProgress}>
                  <View style={styles.interventionProgressBar}>
                    <View 
                      style={[
                        styles.interventionProgressFill,
                        { 
                          width: `${intervention.success}%`,
                          backgroundColor: intervention.success >= 90 ? '#00ff88' : 
                                         intervention.success >= 75 ? '#FFB347' : '#FF6B6B'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.interventionCount}>{intervention.count} total</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Coach Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Coaching Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={[styles.achievementCard, !achievement.earned && styles.lockedAchievement]}>
                <View style={styles.achievementHeader}>
                  <Award size={24} color={achievement.earned ? '#FFD700' : '#999'} />
                  <View style={[
                    styles.rarityBadge,
                    { backgroundColor: achievement.rarity === 'legendary' ? '#9B59B6' : 
                                     achievement.rarity === 'epic' ? '#FF6B6B' : '#4ECDC4' }
                  ]}>
                    <Text style={styles.rarityText}>{achievement.rarity.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={[styles.achievementTitle, !achievement.earned && styles.lockedText]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, !achievement.earned && styles.lockedText]}>
                  {achievement.description}
                </Text>
                {!achievement.earned && achievement.progress && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${achievement.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{achievement.progress}% complete</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Smart Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Smart Insights</Text>
          <View style={styles.insightsContainer}>
            {insights.map((insight, index) => (
              <View key={index} style={styles.insightCard}>
                <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                  <insight.icon size={24} color={insight.color} />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                </View>
              </View>
            ))}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -10,
  },
  periodSelector: {
    marginBottom: 24,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedPeriod: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  selectedMetricCard: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  metricDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    paddingRight: 20,
  },
  chartDay: {
    alignItems: 'center',
    minWidth: 60,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
    height: 100,
  },
  chartBar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  distributionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  distributionChart: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
    position: 'relative',
  },
  chartCenterText: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  distributionLegend: {
    flex: 1,
    gap: 12,
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distributionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  distributionInfo: {
    flex: 1,
  },
  distributionLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  distributionCount: {
    fontSize: 12,
    color: '#666',
  },
  interventionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  interventionItem: {
    marginBottom: 16,
  },
  interventionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  interventionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  interventionSuccess: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00ff88',
  },
  interventionProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  interventionProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  interventionProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  interventionCount: {
    fontSize: 12,
    color: '#666',
    minWidth: 60,
    textAlign: 'right',
  },
  achievementsContainer: {
    gap: 16,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lockedText: {
    color: '#999',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  insightsContainer: {
    gap: 16,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});