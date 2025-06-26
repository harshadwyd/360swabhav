import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBar as BarChart3, TrendingUp, ChartPie as PieChart, Calendar, Target, Award, Activity, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const timeRanges = ['Week', 'Month', 'Quarter', 'Year'];
  const [selectedRange, setSelectedRange] = useState('Month');

  const performanceMetrics = [
    { title: 'Activity Score', value: 87, change: '+5%', color: '#FF6B6B', icon: Activity },
    { title: 'Consistency', value: 92, change: '+12%', color: '#4ECDC4', icon: Target },
    { title: 'Skill Growth', value: 78, change: '+8%', color: '#FFB347', icon: TrendingUp },
    { title: 'Goals Met', value: 85, change: '+3%', color: '#A8E6CF', icon: Award },
  ];

  const weeklyData = [
    { day: 'Mon', activities: 3, points: 45 },
    { day: 'Tue', activities: 2, points: 30 },
    { day: 'Wed', activities: 4, points: 60 },
    { day: 'Thu', activities: 1, points: 15 },
    { day: 'Fri', activities: 5, points: 75 },
    { day: 'Sat', activities: 3, points: 45 },
    { day: 'Sun', activities: 2, points: 30 },
  ];

  const skillBreakdown = [
    { skill: 'Football', percentage: 35, color: '#FF6B6B' },
    { skill: 'Basketball', percentage: 25, color: '#4ECDC4' },
    { skill: 'Swimming', percentage: 20, color: '#FFB347' },
    { skill: 'Athletics', percentage: 20, color: '#A8E6CF' },
  ];

  const recentAchievements = [
    { title: 'Consistency Master', description: '7-day activity streak', date: '2 days ago', rarity: 'rare' },
    { title: 'Skill Improver', description: 'Football skill increased', date: '5 days ago', rarity: 'common' },
    { title: 'Goal Crusher', description: 'Weekly goals completed', date: '1 week ago', rarity: 'epic' },
  ];

  const insights = [
    {
      title: 'Best Performance Day',
      description: 'Fridays are your most active days with an average of 75 points',
      icon: Calendar,
      color: '#4ECDC4'
    },
    {
      title: 'Improvement Trend',
      description: 'Your consistency has improved by 12% this month',
      icon: TrendingUp,
      color: '#FFB347'
    },
    {
      title: 'Time Investment',
      description: 'You spend 45 minutes daily on sports activities',
      icon: Clock,
      color: '#FF6B6B'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your progress and insights</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                selectedRange === range && styles.selectedTimeRange
              ]}
              onPress={() => setSelectedRange(range)}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  styles.timeRangeText,
                  selectedRange === range && styles.selectedTimeRangeText
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsContainer}>
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <metric.icon size={20} color={metric.color} />
                </View>
                <View style={[styles.changeIndicator, { backgroundColor: '#4ECDC420' }]}>
                  <Text style={styles.changeText}>{metric.change}</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}%</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${metric.value}%`, backgroundColor: metric.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
                  <Text style={styles.legendText}>Activities</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
                  <Text style={styles.legendText}>Points</Text>
                </View>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.activityBar, 
                        { height: (data.activities / 5) * 80, backgroundColor: '#FF6B6B' }
                      ]} 
                    />
                    <View 
                      style={[
                        styles.pointsBar, 
                        { height: (data.points / 75) * 60, backgroundColor: '#4ECDC4' }
                      ]} 
                    />
                  </View>
                  <Text style={styles.dayLabel}>{data.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Skill Distribution */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skill Distribution</Text>
          <View style={styles.skillCard}>
            <View style={styles.skillChart}>
              <View style={styles.skillCircle}>
                <PieChart size={80} color="#4ECDC4" />
                <Text style={styles.skillCenterText}>Skills</Text>
              </View>
              <View style={styles.skillLegend}>
                {skillBreakdown.map((skill, index) => (
                  <View key={index} style={styles.skillLegendItem}>
                    <View style={[styles.skillDot, { backgroundColor: skill.color }]} />
                    <Text style={styles.skillName}>{skill.skill}</Text>
                    <Text style={styles.skillPercentage}>{skill.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Smart Insights</Text>
          <View style={styles.insightsList}>
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

        {/* Recent Achievements */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {recentAchievements.map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Award size={20} color="#FFB347" />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                </View>
                <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(achievement.rarity) }]}>
                  <Text style={styles.rarityText}>{achievement.rarity.toUpperCase()}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goals Progress */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Goals Progress</Text>
          <LinearGradient
            colors={['#FF6B6B', '#4ECDC4']}
            style={styles.goalsCard}
          >
            <View style={styles.goalsHeader}>
              <Text style={styles.goalsTitle}>Monthly Goals</Text>
              <Text style={styles.goalsProgress}>12/15 Completed</Text>
            </View>
            <View style={styles.goalsProgressBar}>
              <View style={[styles.goalsProgressFill, { width: '80%' }]} />
            </View>
            <Text style={styles.goalsText}>
              You're doing great! 3 more goals to complete this month.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return '#95A5A6';
    case 'rare': return '#3498DB';
    case 'epic': return '#9B59B6';
    case 'legendary': return '#F39C12';
    default: return '#95A5A6';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
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
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedTimeRange: {
    backgroundColor: '#4ECDC4',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedTimeRangeText: {
    color: '#FFFFFF',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
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
  chartHeader: {
    marginBottom: 20,
  },
  chartLegend: {
    flexDirection: 'row',
    gap: 20,
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
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 8,
  },
  activityBar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  pointsBar: {
    width: 8,
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  skillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  skillChart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  skillCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  skillCenterText: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  skillLegend: {
    flex: 1,
    gap: 12,
  },
  skillLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  skillName: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  skillPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  insightsList: {
    gap: 16,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
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
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB34720',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalsCard: {
    borderRadius: 20,
    padding: 24,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalsProgress: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  goalsProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 12,
  },
  goalsProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  goalsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
});