import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Crown, Trophy, Medal, Star, TrendingUp, MessageCircle, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Community() {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', points: 4250, avatar: '👑', level: 'Gold', isCurrentUser: false },
    { rank: 2, name: 'Mike Johnson', points: 3890, avatar: '🏆', level: 'Silver', isCurrentUser: false },
    { rank: 3, name: 'You', points: 2847, avatar: '🌟', level: 'Silver', isCurrentUser: true },
    { rank: 4, name: 'Emily Davis', points: 2640, avatar: '⚡', level: 'Bronze', isCurrentUser: false },
    { rank: 5, name: 'Alex Thompson', points: 2315, avatar: '🔥', level: 'Bronze', isCurrentUser: false },
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Fitness Challenge',
      description: 'Complete daily workouts for 30 days',
      participants: 156,
      timeLeft: '12 days left',
      reward: '500 XP + Badge',
      difficulty: 'Medium',
      color: '#FF6B6B'
    },
    {
      id: 2,
      title: 'Team Spirit Week',
      description: 'Support teammates and show sportsmanship',
      participants: 89,
      timeLeft: '3 days left',
      reward: '300 XP + Title',
      difficulty: 'Easy',
      color: '#4ECDC4'
    },
    {
      id: 3,
      title: 'Skill Master Challenge',
      description: 'Master 3 new sports techniques',
      participants: 72,
      timeLeft: '8 days left',
      reward: '750 XP + Rare Badge',
      difficulty: 'Hard',
      color: '#FFB347'
    },
  ];

  const recentPosts = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👑',
      content: 'Just completed my 50th training session! The consistency is really paying off. Who else is crushing their goals this week?',
      time: '2h ago',
      likes: 24,
      comments: 8,
      achievement: 'Consistency Champion'
    },
    {
      id: 2,
      author: 'Coach Martinez',
      avatar: '🏅',
      content: 'Amazing progress from everyone in today\'s football practice! Remember, improvement comes from showing up every day.',
      time: '4h ago',
      likes: 45,
      comments: 12,
      achievement: null
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: '🏆',
      content: 'New personal best in swimming today! 🏊‍♂️ Thanks to everyone for the motivation and tips.',
      time: '6h ago',
      likes: 18,
      comments: 5,
      achievement: 'Personal Best'
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={24} color="#FFD700" />;
      case 2: return <Trophy size={24} color="#C0C0C0" />;
      case 3: return <Medal size={24} color="#CD7F32" />;
      default: return <Star size={20} color="#999" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4ECDC4';
      case 'Medium': return '#FFB347';
      case 'Hard': return '#FF6B6B';
      default: return '#999';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSubtitle}>Connect, compete, and grow together</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Leaderboard */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
          <View style={styles.leaderboardContainer}>
            {leaderboardData.map((user, index) => (
              <View 
                key={index} 
                style={[
                  styles.leaderboardItem,
                  user.isCurrentUser && styles.currentUserItem
                ]}
              >
                <View style={styles.rankContainer}>
                  {getRankIcon(user.rank)}
                  <Text style={styles.rankText}>#{user.rank}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userAvatar}>{user.avatar}</Text>
                  <View style={styles.userDetails}>
                    <Text 
                      style={[
                        styles.userName,
                        user.isCurrentUser && styles.currentUserName
                      ]}
                    >
                      {user.name}
                    </Text>
                    <Text style={styles.userLevel}>{user.level} • {user.points} XP</Text>
                  </View>
                </View>
                {user.isCurrentUser && (
                  <View style={styles.currentUserBadge}>
                    <Text style={styles.currentUserBadgeText}>YOU</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Active Challenges */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.challengesContainer}>
              {challenges.map((challenge) => (
                <TouchableOpacity 
                  key={challenge.id} 
                  style={styles.challengeCard}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[challenge.color, challenge.color + '80']}
                    style={styles.challengeGradient}
                  >
                    <View style={styles.challengeHeader}>
                      <Text style={styles.challengeTitle}>{challenge.title}</Text>
                      <View 
                        style={[
                          styles.difficultyBadge,
                          { backgroundColor: getDifficultyColor(challenge.difficulty) }
                        ]}
                      >
                        <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
                      </View>
                    </View>
                    <Text style={styles.challengeDescription}>{challenge.description}</Text>
                    <View style={styles.challengeStats}>
                      <View style={styles.challengeStat}>
                        <Users size={16} color="rgba(255,255,255,0.8)" />
                        <Text style={styles.challengeStatText}>{challenge.participants} joined</Text>
                      </View>
                      <Text style={styles.challengeTimeLeft}>{challenge.timeLeft}</Text>
                    </View>
                    <View style={styles.challengeReward}>
                      <Trophy size={16} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.challengeRewardText}>{challenge.reward}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Activity Feed */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          <View style={styles.feedContainer}>
            {recentPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <View style={styles.postAuthor}>
                    <Text style={styles.authorAvatar}>{post.avatar}</Text>
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{post.author}</Text>
                      <Text style={styles.postTime}>{post.time}</Text>
                    </View>
                  </View>
                  {post.achievement && (
                    <View style={styles.achievementBadge}>
                      <Star size={12} color="#FFB347" />
                      <Text style={styles.achievementText}>{post.achievement}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <Heart size={16} color="#FF6B6B" />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <MessageCircle size={16} color="#4ECDC4" />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <TrendingUp size={16} color="#FFB347" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Join Community CTA */}
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Ready to Level Up?</Text>
          <Text style={styles.ctaDescription}>
            Join challenges, connect with athletes, and achieve your goals together!
          </Text>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaButtonText}>Explore More</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  leaderboardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentUserItem: {
    backgroundColor: '#4ECDC410',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#4ECDC4',
  },
  userLevel: {
    fontSize: 14,
    color: '#666',
  },
  currentUserBadge: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentUserBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  challengesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  challengeCard: {
    width: width * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  challengeDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeStatText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  challengeTimeLeft: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeRewardText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  feedContainer: {
    gap: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    fontSize: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB34720',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  achievementText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFB347',
  },
  postContent: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ctaCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});