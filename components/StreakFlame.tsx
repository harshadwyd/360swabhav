import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Flame } from 'lucide-react-native';

interface StreakFlameProps {
  streakDays: number;
  size?: number;
}

export default function StreakFlame({ streakDays, size = 24 }: StreakFlameProps) {
  const flameAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous flame animation
    const flameAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(flameAnim, {
          toValue: 1.2,
          duration: 800 + Math.random() * 400,
          useNativeDriver: true,
        }),
        Animated.timing(flameAnim, {
          toValue: 0.9,
          duration: 600 + Math.random() * 400,
          useNativeDriver: true,
        }),
        Animated.timing(flameAnim, {
          toValue: 1.1,
          duration: 700 + Math.random() * 300,
          useNativeDriver: true,
        }),
        Animated.timing(flameAnim, {
          toValue: 1,
          duration: 500 + Math.random() * 300,
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation for longer streaks
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    flameAnimation.start();
    
    if (streakDays >= 7) {
      glowAnimation.start();
    }

    return () => {
      flameAnimation.stop();
      glowAnimation.stop();
    };
  }, [streakDays]);

  const getFlameColor = () => {
    if (streakDays >= 21) return '#FF4500'; // Epic flame
    if (streakDays >= 14) return '#FF6B35'; // Strong flame
    if (streakDays >= 7) return '#FF8C42';  // Good flame
    return '#FFA500'; // Starting flame
  };

  const getFlameSize = () => {
    const baseSize = size;
    if (streakDays >= 21) return baseSize * 1.4;
    if (streakDays >= 14) return baseSize * 1.2;
    if (streakDays >= 7) return baseSize * 1.1;
    return baseSize;
  };

  const getGlowIntensity = () => {
    if (streakDays >= 21) return 0.8;
    if (streakDays >= 14) return 0.6;
    if (streakDays >= 7) return 0.4;
    return 0;
  };

  return (
    <View style={styles.container}>
      {/* Glow effect for longer streaks */}
      {streakDays >= 7 && (
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: Animated.multiply(glowAnim, getGlowIntensity()),
              transform: [{ scale: Animated.multiply(flameAnim, 1.5) }],
              backgroundColor: getFlameColor() + '40',
              width: getFlameSize() * 2,
              height: getFlameSize() * 2,
              borderRadius: getFlameSize(),
            },
          ]}
        />
      )}
      
      {/* Main flame */}
      <Animated.View
        style={[
          styles.flame,
          {
            transform: [
              { scale: Animated.multiply(flameAnim, scaleAnim) },
              { 
                rotate: flameAnim.interpolate({
                  inputRange: [0.9, 1.2],
                  outputRange: ['-2deg', '2deg'],
                })
              },
            ],
          },
        ]}
      >
        <Flame size={getFlameSize()} color={getFlameColor()} />
      </Animated.View>

      {/* Particle effects for epic streaks */}
      {streakDays >= 21 && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  opacity: glowAnim,
                  transform: [
                    {
                      translateX: Math.cos((index * 120) * Math.PI / 180) * 15,
                    },
                    {
                      translateY: Math.sin((index * 120) * Math.PI / 180) * 15,
                    },
                    { scale: flameAnim },
                  ],
                },
              ]}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
  },
  flame: {
    zIndex: 1,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD700',
  },
});