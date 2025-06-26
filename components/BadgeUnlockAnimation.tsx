import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Trophy, Star, Crown, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeUnlockAnimationProps {
  badge: Badge | null;
  visible: boolean;
  onComplete: () => void;
}

export default function BadgeUnlockAnimation({ badge, visible, onComplete }: BadgeUnlockAnimationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const confettiAnims = useRef(
    Array.from({ length: 20 }, () => ({
      translateY: new Animated.Value(-100),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    if (visible && badge) {
      // Reset all animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
      
      confettiAnims.forEach((anim, index) => {
        anim.translateY.setValue(-100);
        anim.translateX.setValue((Math.random() - 0.5) * width);
        anim.rotate.setValue(0);
        anim.opacity.setValue(1);
      });

      // Start main animation
      Animated.sequence([
        // Fade in background
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Badge entrance with explosion
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          // Confetti animation
          Animated.stagger(50, confettiAnims.map((anim) =>
            Animated.parallel([
              Animated.timing(anim.translateY, {
                toValue: height + 100,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.timing(anim.rotate, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.sequence([
                Animated.delay(1500),
                Animated.timing(anim.opacity, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
            ])
          )),
        ]),
        // Pulsing effect
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 1 }
        ),
        // Hold for reading
        Animated.delay(2000),
        // Exit animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible, badge]);

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return ['#FFD700', '#FFA500', '#FF6B6B'];
      case 'epic':
        return ['#9B59B6', '#8E44AD', '#7D3C98'];
      case 'rare':
        return ['#3498DB', '#2980B9', '#1F618D'];
      default:
        return ['#95A5A6', '#7F8C8D', '#566573'];
    }
  };

  const getRarityParticles = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return { count: 20, colors: ['#FFD700', '#FFA500', '#FF6B6B'] };
      case 'epic':
        return { count: 15, colors: ['#9B59B6', '#8E44AD'] };
      case 'rare':
        return { count: 10, colors: ['#3498DB', '#2980B9'] };
      default:
        return { count: 5, colors: ['#95A5A6', '#7F8C8D'] };
    }
  };

  if (!visible || !badge) return null;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const particles = getRarityParticles(badge.rarity);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      />
      
      {/* Confetti */}
      {confettiAnims.slice(0, particles.count).map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.confetti,
            {
              backgroundColor: particles.colors[index % particles.colors.length],
              transform: [
                { translateX: anim.translateX },
                { translateY: anim.translateY },
                {
                  rotate: anim.rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '720deg'],
                  }),
                },
              ],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}

      {/* Main badge animation */}
      <Animated.View
        style={[
          styles.badgeContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) },
              { rotate: spin },
            ],
          },
        ]}
      >
        {/* Glow effect for legendary badges */}
        {badge.rarity === 'legendary' && (
          <View style={[styles.glowEffect, { backgroundColor: getRarityGlow(badge.rarity)[0] + '40' }]} />
        )}
        
        <View style={[styles.badgeCard, { borderColor: getRarityGlow(badge.rarity)[0] }]}>
          <View style={styles.badgeHeader}>
            <Text style={styles.badgeUnlockedText}>🎉 BADGE UNLOCKED! 🎉</Text>
            <View style={[styles.rarityBadge, { backgroundColor: getRarityGlow(badge.rarity)[0] }]}>
              <Text style={styles.rarityText}>{badge.rarity.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={[styles.badgeIcon, { backgroundColor: badge.color + '20' }]}>
            <badge.icon size={48} color={badge.color} />
          </View>
          
          <Text style={styles.badgeTitle}>{badge.title}</Text>
          <Text style={styles.badgeDescription}>{badge.description}</Text>
          
          <View style={styles.celebrationRow}>
            <Star size={16} color="#FFD700" />
            <Text style={styles.celebrationText}>Amazing Character Growth!</Text>
            <Star size={16} color="#FFD700" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
  },
  badgeCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    maxWidth: width * 0.85,
  },
  badgeHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeUnlockedText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  badgeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  badgeDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  celebrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  celebrationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
  },
});