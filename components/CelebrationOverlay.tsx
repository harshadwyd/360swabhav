import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Trophy, Star, Heart, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface CelebrationOverlayProps {
  visible: boolean;
  type: 'checklist' | 'badge' | 'streak' | 'levelup';
  message: string;
  onComplete: () => void;
}

export default function CelebrationOverlay({ visible, type, message, onComplete }: CelebrationOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const fireworkAnims = useRef(
    Array.from({ length: 12 }, () => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(1),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      fireworkAnims.forEach(anim => {
        anim.scale.setValue(0);
        anim.opacity.setValue(1);
        anim.translateX.setValue(0);
        anim.translateY.setValue(0);
      });

      // Start celebration sequence
      Animated.sequence([
        // Fade in background
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        // Main message entrance
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        // Fireworks explosion
        Animated.parallel([
          ...fireworkAnims.map((anim, index) => {
            const angle = (index * 30) * Math.PI / 180;
            const distance = 100 + Math.random() * 50;
            
            return Animated.parallel([
              Animated.timing(anim.scale, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(anim.translateX, {
                toValue: Math.cos(angle) * distance,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(anim.translateY, {
                toValue: Math.sin(angle) * distance,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.sequence([
                Animated.delay(400),
                Animated.timing(anim.opacity, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: true,
                }),
              ]),
            ]);
          }),
        ]),
        // Hold for reading
        Animated.delay(1500),
        // Exit animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  const getTypeConfig = () => {
    switch (type) {
      case 'checklist':
        return {
          icon: Star,
          color: '#4ECDC4',
          title: '🎉 Checklist Complete!',
          emoji: '✨',
        };
      case 'badge':
        return {
          icon: Trophy,
          color: '#FFD700',
          title: '🏆 Badge Unlocked!',
          emoji: '🎊',
        };
      case 'streak':
        return {
          icon: Zap,
          color: '#FF6B6B',
          title: '🔥 Streak Milestone!',
          emoji: '⚡',
        };
      case 'levelup':
        return {
          icon: Heart,
          color: '#9B59B6',
          title: '🚀 Level Up!',
          emoji: '🌟',
        };
      default:
        return {
          icon: Star,
          color: '#4ECDC4',
          title: '🎉 Awesome!',
          emoji: '✨',
        };
    }
  };

  if (!visible) return null;

  const config = getTypeConfig();
  const IconComponent = config.icon;

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
      
      {/* Fireworks */}
      {fireworkAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.firework,
            {
              backgroundColor: index % 2 === 0 ? config.color : '#FFD700',
              transform: [
                { translateX: anim.translateX },
                { translateY: anim.translateY },
                { scale: anim.scale },
              ],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}

      {/* Main celebration content */}
      <Animated.View
        style={[
          styles.celebrationContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.celebrationCard}>
          <Text style={styles.emojiText}>{config.emoji}</Text>
          
          <View style={[styles.iconContainer, { backgroundColor: config.color + '20' }]}>
            <IconComponent size={48} color={config.color} />
          </View>
          
          <Text style={styles.titleText}>{config.title}</Text>
          <Text style={styles.messageText}>{message}</Text>
          
          <View style={styles.sparkleRow}>
            <Text style={styles.sparkleText}>✨ ⭐ ✨ ⭐ ✨</Text>
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
    zIndex: 1500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  firework: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: height / 2,
    left: width / 2,
  },
  celebrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebrationCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    maxWidth: width * 0.85,
  },
  emojiText: {
    fontSize: 48,
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  sparkleRow: {
    marginTop: 8,
  },
  sparkleText: {
    fontSize: 20,
    color: '#FFD700',
  },
});