import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Star, Zap, Trophy, Heart, Target, Users, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PointsAnimationProps {
  points: number;
  visible: boolean;
  onComplete: () => void;
  multiplier?: number;
  type?: 'normal' | 'streak' | 'bonus' | 'checklist' | 'voice' | 'character' | 'badge' | 'level';
  source?: string; // What action triggered the points
}

export default function PointsAnimation({ 
  points, 
  visible, 
  onComplete, 
  multiplier = 1,
  type = 'normal',
  source = 'activity'
}: PointsAnimationProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Particle animations for enhanced celebrations
  const particleAnims = useRef(
    Array.from({ length: 8 }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (visible) {
      // Reset all animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      translateYAnim.setValue(50);
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
      
      particleAnims.forEach(anim => {
        anim.translateX.setValue(0);
        anim.translateY.setValue(0);
        anim.scale.setValue(0);
        anim.opacity.setValue(1);
        anim.rotate.setValue(0);
      });

      // Enhanced animation sequence based on type
      const isSpecialCelebration = type === 'streak' || type === 'bonus' || type === 'badge' || type === 'level';
      
      Animated.sequence([
        // Initial burst entrance
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: isSpecialCelebration ? 1.4 : 1.2,
            useNativeDriver: true,
            tension: 80,
            friction: 6,
          }),
          Animated.spring(fadeAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(translateYAnim, {
            toValue: -40,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          // Particle explosion
          ...particleAnims.map((anim, index) => {
            const angle = (index * 45) * Math.PI / 180;
            const distance = isSpecialCelebration ? 80 : 60;
            
            return Animated.parallel([
              Animated.spring(anim.scale, {
                toValue: 1,
                useNativeDriver: true,
                tension: 100,
                friction: 8,
              }),
              Animated.timing(anim.translateX, {
                toValue: Math.cos(angle) * distance,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.translateY, {
                toValue: Math.sin(angle) * distance,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.rotate, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
            ]);
          }),
        ]),
        
        // Celebration pulse and rotation
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          // Pulsing effect for special celebrations
          ...(isSpecialCelebration ? [
            Animated.loop(
              Animated.sequence([
                Animated.timing(pulseAnim, {
                  toValue: 1.1,
                  duration: 400,
                  useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                  toValue: 1,
                  duration: 400,
                  useNativeDriver: true,
                }),
              ]),
              { iterations: 2 }
            )
          ] : []),
        ]),
        
        // Particle fade out
        Animated.parallel(
          particleAnims.map(anim =>
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            })
          )
        ),
        
        // Hold for reading
        Animated.delay(isSpecialCelebration ? 1500 : 1000),
        
        // Exit animation
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -100,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  const getIcon = () => {
    switch (type) {
      case 'streak':
        return <Zap size={28} color="#FFD700" />;
      case 'bonus':
        return <Trophy size={28} color="#FF6B6B" />;
      case 'checklist':
        return <Target size={28} color="#4ECDC4" />;
      case 'voice':
        return <Heart size={28} color="#9B59B6" />;
      case 'character':
        return <Users size={28} color="#45B7D1" />;
      case 'badge':
        return <Award size={28} color="#FFD700" />;
      case 'level':
        return <Trophy size={28} color="#FF6B6B" />;
      default:
        return <Star size={28} color="#4ECDC4" />;
    }
  };

  const getGradientColors = () => {
    switch (type) {
      case 'streak':
        return ['#FFD700', '#FFA500'];
      case 'bonus':
        return ['#FF6B6B', '#FF8E53'];
      case 'checklist':
        return ['#4ECDC4', '#44A08D'];
      case 'voice':
        return ['#9B59B6', '#8E44AD'];
      case 'character':
        return ['#45B7D1', '#3498DB'];
      case 'badge':
        return ['#FFD700', '#F39C12'];
      case 'level':
        return ['#FF6B6B', '#E74C3C'];
      default:
        return ['#4ECDC4', '#44A08D'];
    }
  };

  const getCelebrationMessage = () => {
    switch (type) {
      case 'streak':
        return 'Streak Bonus!';
      case 'bonus':
        return 'Bonus Points!';
      case 'checklist':
        return 'Task Complete!';
      case 'voice':
        return 'Voice Journal!';
      case 'character':
        return 'Character Growth!';
      case 'badge':
        return 'Badge Earned!';
      case 'level':
        return 'Level Up!';
      default:
        return 'Points Earned!';
    }
  };

  const getParticleColor = (index: number) => {
    const colors = getGradientColors();
    const extraColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6'];
    return [...colors, ...extraColors][index % 6];
  };

  if (!visible) return null;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const totalPoints = points * multiplier;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animationContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) },
              { translateY: translateYAnim },
              { rotate: spin },
            ],
          },
        ]}
      >
        <View style={[
          styles.pointsCard, 
          { 
            backgroundColor: getGradientColors()[0] + '20',
            borderColor: getGradientColors()[0],
          }
        ]}>
          <View style={styles.cardHeader}>
            <Text style={styles.celebrationMessage}>{getCelebrationMessage()}</Text>
          </View>
          
          <View style={styles.iconContainer}>
            {getIcon()}
          </View>
          
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>+{totalPoints}</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </View>
          
          {multiplier > 1 && (
            <View style={styles.multiplierContainer}>
              <Text style={styles.multiplierText}>{multiplier}x Streak Bonus!</Text>
            </View>
          )}
          
          {source && (
            <Text style={styles.sourceText}>from {source}</Text>
          )}
        </View>
        
        {/* Enhanced particle effects */}
        {particleAnims.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: getParticleColor(index),
                transform: [
                  { translateX: anim.translateX },
                  { translateY: anim.translateY },
                  { scale: anim.scale },
                  {
                    rotate: anim.rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
                opacity: anim.opacity,
              },
            ]}
          />
        ))}
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsCard: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    minWidth: 200,
  },
  cardHeader: {
    marginBottom: 8,
  },
  celebrationMessage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  multiplierContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  multiplierText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
    textAlign: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
  particle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});