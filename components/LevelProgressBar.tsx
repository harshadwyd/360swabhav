import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Star, Crown, Trophy } from 'lucide-react-native';
import { animationQueue } from './PointsAnimationManager';

const { width } = Dimensions.get('window');

interface LevelProgressBarProps {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXP: number;
  onLevelUp?: () => void;
}

export default function LevelProgressBar({ 
  currentLevel, 
  currentXP, 
  xpForNextLevel, 
  totalXP,
  onLevelUp 
}: LevelProgressBarProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const levelUpAnim = useRef(new Animated.Value(1)).current;
  const previousLevel = useRef(currentLevel);

  useEffect(() => {
    const progress = currentXP / xpForNextLevel;
    
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Check for level up
    if (currentLevel > previousLevel.current) {
      triggerLevelUpAnimation();
      onLevelUp?.();
      previousLevel.current = currentLevel;
    }
  }, [currentXP, xpForNextLevel, currentLevel]);

  const triggerLevelUpAnimation = () => {
    // Add level up to animation queue
    animationQueue.addAnimation({
      points: 100,
      type: 'level',
      source: `Level ${currentLevel} achieved!`,
    });
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(levelUpAnim, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(levelUpAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getLevelIcon = () => {
    if (currentLevel >= 5) return Crown;
    if (currentLevel >= 3) return Trophy;
    return Star;
  };

  const getLevelColor = () => {
    if (currentLevel >= 5) return '#FFD700';
    if (currentLevel >= 4) return '#FF6B6B';
    if (currentLevel >= 3) return '#9B59B6';
    if (currentLevel >= 2) return '#4ECDC4';
    return '#95A5A6';
  };

  const getLevelTitle = () => {
    switch (currentLevel) {
      case 1: return 'Character Explorer';
      case 2: return 'Habit Builder';
      case 3: return 'Discipline Warrior';
      case 4: return 'Character Champion';
      case 5: return 'Swabhav Hero';
      default: return 'Character Master';
    }
  };

  const IconComponent = getLevelIcon();

  return (
    <View style={styles.container}>
      {/* Level indicator */}
      <Animated.View
        style={[
          styles.levelIndicator,
          {
            transform: [{ scale: levelUpAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.levelGlow,
            {
              opacity: glowAnim,
              backgroundColor: getLevelColor() + '40',
            },
          ]}
        />
        <View style={[styles.levelIcon, { backgroundColor: getLevelColor() + '20' }]}>
          <IconComponent size={24} color={getLevelColor()} />
        </View>
        <View style={styles.levelInfo}>
          <Text style={styles.levelNumber}>Level {currentLevel}</Text>
          <Text style={styles.levelTitle}>{getLevelTitle()}</Text>
        </View>
        <View style={styles.totalXpContainer}>
          <Text style={styles.totalXpText}>Total: {totalXP.toLocaleString()} XP</Text>
        </View>
      </Animated.View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getLevelColor(),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progressGlow,
              {
                opacity: glowAnim,
                backgroundColor: getLevelColor() + '60',
              },
            ]}
          />
        </View>
        
        <View style={styles.xpInfo}>
          <Text style={styles.xpText}>
            {currentXP.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
          </Text>
        </View>
      </View>

      {/* Next level preview */}
      <View style={styles.nextLevelContainer}>
        <Text style={styles.nextLevelText}>
          Next: Level {currentLevel + 1}
        </Text>
        <Text style={styles.nextLevelTitle}>
          {currentLevel === 1 ? 'Habit Builder' :
           currentLevel === 2 ? 'Discipline Warrior' :
           currentLevel === 3 ? 'Character Champion' :
           currentLevel === 4 ? 'Swabhav Hero' : 'Character Master'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelGlow: {
    position: 'absolute',
    left: -10,
    top: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  levelInfo: {
    flex: 1,
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  levelTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  totalXpContainer: {
    alignItems: 'flex-end',
  },
  totalXpText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 8,
  },
  xpInfo: {
    alignItems: 'center',
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextLevelContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  nextLevelText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  nextLevelTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});