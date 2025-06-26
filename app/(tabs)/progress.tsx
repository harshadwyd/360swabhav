import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Target, Calendar, Award, Trophy, Zap } from 'lucide-react-native';
import EnhancedProgressDashboard from '@/components/EnhancedProgressDashboard';
import ProgressExplanation from '@/components/ProgressExplanation';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const progressData = [
    { 
      title: 'Skills', 
      percentage: 85, 
      color: '#FF6B6B',
      description: 'Character trait mastery across 10 core areas',
      trend: 'up' as const,
      trendValue: '+12%'
    },
    { 
      title: 'Activities', 
      percentage: 92, 
      color: '#4ECDC4',
      description: 'Daily character-building habit completion',
      trend: 'up' as const,
      trendValue: '+8%'
    },
    { 
      title: 'Goals', 
      percentage: 78, 
      color: '#45B7D1',
      description: 'Weekly character development objectives',
      trend: 'up' as const,
      trendValue: '+15%'
    },
  ];

  const progressStats = [
    { title: 'Improvement', value: '+15%', subtitle: 'vs last week', icon: TrendingUp, color: '#4ECDC4' },
    { title: 'Goals Met', value: '8/10', subtitle: 'This week', icon: Target, color: '#FF6B6B' },
    { title: 'Active Days', value: '6/7', subtitle: 'This week', icon: Calendar, color: '#45B7D1' },
    { title: 'New Badges', value: '3', subtitle: 'This month', icon: Award, color: '#FFD700' },
  ];

  const achievements = [
    {
      title: 'Weekly Champion',
      description: 'Completed all daily activities for 7 days',
      icon: Trophy,
      color: '#FFD700',
    },
    {
      title: 'Skill Master',
      description: 'Achieved 90% in basketball skills',
      icon: Target,
      color: '#FF6B6B',
    },
    {
      title: 'Lightning Fast',
      description: 'Improved speed by 20% this month',
      icon: Zap,
      color: '#4ECDC4',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#9B59B6', '#8E44AD']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Track your journey to excellence</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Enhanced Progress Dashboard */}
        <View style={styles.section}>
          <EnhancedProgressDashboard
            currentLevel={3}
            totalXP={2847}
            weeklyGoals={10}
            completedGoals={8}
          />
        </View>

        {/* Progress Explanations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 What Your Numbers Mean</Text>
          {progressData.map((item, index) => (
            <ProgressExplanation
              key={index}
              title={item.title}
              percentage={item.percentage}
              description={item.description}
              trend={item.trend}
              trendValue={item.trendValue}
              color={item.color}
              onPress={() => console.log(`View ${item.title} details`)}
            />
          ))}
        </View>

        {/* Progress Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress Stats</Text>
          <View style={styles.statsGrid}>
            {progressStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                  <achievement.icon size={24} color={achievement.color} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
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
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  achievementsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
});