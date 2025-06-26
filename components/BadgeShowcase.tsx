import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Heart, Target, Users, Clock, Star, Flame, Crown } from 'lucide-react-native';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface BadgeShowcaseProps {
  badges: Badge[];
  onBadgePress: (badge: Badge) => void;
}

export default function BadgeShowcase({ badges, onBadgePress }: BadgeShowcaseProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#95A5A6';
      case 'rare': return '#3498DB';
      case 'epic': return '#9B59B6';
      case 'legendary': return '#F39C12';
      default: return '#95A5A6';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return ['#F39C12', '#E67E22', '#D35400'];
      case 'epic': return ['#9B59B6', '#8E44AD', '#7D3C98'];
      case 'rare': return ['#3498DB', '#2980B9', '#1F618D'];
      default: return ['#95A5A6', '#7F8C8D', '#566573'];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Character Badges</Text>
        <Text style={styles.subtitle}>Your character development journey</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.badgesScroll}
        contentContainerStyle={styles.badgesContainer}
      >
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[styles.badgeCard, !badge.earned && styles.lockedBadge]}
            onPress={() => onBadgePress(badge)}
            activeOpacity={0.8}
          >
            {badge.earned && badge.rarity === 'legendary' && (
              <LinearGradient
                colors={getRarityGlow(badge.rarity)}
                style={styles.legendaryGlow}
              />
            )}
            
            <View style={styles.badgeContent}>
              <View style={[styles.badgeIcon, { backgroundColor: badge.color + '20' }]}>
                <badge.icon 
                  size={32} 
                  color={badge.earned ? badge.color : 'rgba(255, 255, 255, 0.3)'} 
                />
              </View>
              
              <Text style={[styles.badgeTitle, !badge.earned && styles.lockedText]}>
                {badge.title}
              </Text>
              
              <Text style={[styles.badgeDescription, !badge.earned && styles.lockedText]}>
                {badge.description}
              </Text>
              
              <View style={styles.badgeFooter}>
                <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(badge.rarity) }]}>
                  <Text style={styles.rarityText}>{badge.rarity.toUpperCase()}</Text>
                </View>
                
                <View style={styles.pointsBadge}>
                  <Star size={12} color="#FFD700" />
                  <Text style={styles.pointsText}>{badge.points}</Text>
                </View>
              </View>
              
              {badge.earned && (
                <View style={styles.earnedIndicator}>
                  <Text style={styles.earnedText}>✨ Earned!</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  badgesScroll: {
    paddingLeft: 24,
  },
  badgesContainer: {
    paddingRight: 24,
    gap: 16,
  },
  badgeCard: {
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  lockedBadge: {
    opacity: 0.6,
  },
  legendaryGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
    zIndex: -1,
  },
  badgeContent: {
    padding: 16,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  badgeDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  lockedText: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  badgeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  pointsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFD700',
  },
  earnedIndicator: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  earnedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#00ff88',
  },
});