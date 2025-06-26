import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Target, Flame, Users, Lock, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AchievementsScreen() {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first activity',
      points: 50,
      unlocked: true,
      icon: Star,
      color: '#4ECDC4',
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Stay active for 7 consecutive days',
      points: 200,
      unlocked: false,
      icon: Flame,
      color: '#FF6B6B',
      progress: 0,
    },
    {
      id: 3,
      title: 'Skill Collector',
      description: 'Master 5 different skills',
      points: 300,
      unlocked: true,
      icon: Target,
      color: '#45B7D1',
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'Participate in 10 team activities',
      points: 250,
      unlocked: false,
      icon: Users,
      color: '#9B59B6',
      progress: 70,
    },
    {
      id: 5,
      title: 'Lightning Fast',
      description: 'Improve your speed by 25%',
      points: 400,
      unlocked: false,
      icon: Trophy,
      color: '#FFD700',
      progress: 45,
    },
    {
      id: 6,
      title: 'Champion',
      description: 'Win your first competition',
      points: 500,
      unlocked: false,
      icon: Trophy,
      color: '#FF6B6B',
      progress: 0,
    },
  ];

  const categories = [
    { title: 'Skills', count: '3 of 8 unlocked', icon: Target, color: '#4ECDC4' },
    { title: 'Streaks', count: '2 of 5 unlocked', icon: Flame, color: '#FF6B6B' },
    { title: 'Competitions', count: '0 of 6 unlocked', icon: Trophy, color: '#FFD700' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Trophy size={32} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Achievements</Text>
          <Text style={styles.headerSubtitle}>Celebrate your victories</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Unlocked</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>550</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Your Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Badges</Text>
          <View style={styles.badgesGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.badgeCard,
                  !achievement.unlocked && styles.lockedBadge,
                ]}
                activeOpacity={0.8}
              >
                <View style={styles.badgeHeader}>
                  <View
                    style={[
                      styles.badgeIcon,
                      { backgroundColor: achievement.color + '20' },
                    ]}
                  >
                    {achievement.unlocked ? (
                      <achievement.icon size={24} color={achievement.color} />
                    ) : (
                      <Lock size={24} color="rgba(255, 255, 255, 0.3)" />
                    )}
                  </View>
                  <View style={styles.pointsBadge}>
                    <Star size={12} color="#FFD700" />
                    <Text style={styles.pointsText}>{achievement.points}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.badgeTitle,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.badgeDescription,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.description}
                </Text>
                {achievement.unlocked ? (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>🔓 Unlocked</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.lockedBadgeIndicator}>
                      <Text style={styles.lockedBadgeText}>🔒 Unlocked</Text>
                    </View>
                    {achievement.progress !== undefined && achievement.progress > 0 && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              { width: `${achievement.progress}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>{achievement.progress}%</Text>
                      </View>
                    )}
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievement Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievement Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard} activeOpacity={0.8}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryCount}>{category.count}</Text>
                </View>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
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
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 40,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
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
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: (width - 64) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  pointsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFD700',
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 16,
    marginBottom: 12,
  },
  lockedText: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  unlockedBadge: {
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  unlockedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  lockedBadgeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  lockedBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  categoriesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryArrow: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.3)',
  },
});