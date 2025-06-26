import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Sun, Sunset, Moon, Mic, Heart, Target, Users, Clock, Trophy, Star } from 'lucide-react-native';
import GameifiedChecklistCard from '@/components/GameifiedChecklistCard';
import VoiceJournal from '@/components/VoiceJournal';
import CharacterTracker from '@/components/CharacterTracker';
import BadgeShowcase from '@/components/BadgeShowcase';
import MentorConnection from '@/components/MentorConnection';
import StreakFlame from '@/components/StreakFlame';
import LevelProgressBar from '@/components/LevelProgressBar';
import PointsAnimationManager, { animationQueue } from '@/components/PointsAnimationManager';
import BadgeUnlockAnimation from '@/components/BadgeUnlockAnimation';

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
  points: number;
}

export default function HomeScreen() {
  // FIXED: Start fresh users at 0 points - CRITICAL FIX
  const [currentStreak, setCurrentStreak] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0); // FIXED: Start at 0 points
  const [level, setLevel] = useState(1);
  const [hasVoiceJournal, setHasVoiceJournal] = useState(false);
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<any>(null);

  const [morningChecklist, setMorningChecklist] = useState<ChecklistItem[]>([
    { id: 1, task: 'Wake up on time', completed: false, points: 10 },
    { id: 2, task: 'Morning exercise/stretches', completed: false, points: 15 },
    { id: 3, task: 'Healthy breakfast', completed: false, points: 10 },
    { id: 4, task: 'Gratitude moment (3 things)', completed: false, points: 10 },
    { id: 5, task: 'Set daily intention', completed: false, points: 5 },
  ]);

  const [afternoonChecklist, setAfternoonChecklist] = useState<ChecklistItem[]>([
    { id: 1, task: 'School/training attendance', completed: false, points: 15 },
    { id: 2, task: 'Focused study/practice session', completed: false, points: 20 },
    { id: 3, task: 'Healthy lunch', completed: false, points: 10 },
    { id: 4, task: 'Help someone (record who/how)', completed: false, points: 25 },
    { id: 5, task: 'Physical activity (sports/play)', completed: false, points: 15 },
  ]);

  const [nightChecklist, setNightChecklist] = useState<ChecklistItem[]>([
    { id: 1, task: 'Evening reflection', completed: false, points: 10 },
    { id: 2, task: "Tomorrow's preparation", completed: false, points: 10 },
    { id: 3, task: 'Screen time check (under limit?)', completed: false, points: 10 },
    { id: 4, task: 'Forgiveness practice (if needed)', completed: false, points: 15 },
    { id: 5, task: 'Gratitude before sleep', completed: false, points: 5 },
  ]);

  const characterBadges = [
    {
      id: 'helper',
      title: 'Helper of the Week',
      description: 'Helped someone without being asked',
      icon: Heart,
      color: '#FF6B6B',
      earned: false, // FIXED: Start with no badges earned
      rarity: 'rare' as const,
      points: 200,
    },
    {
      id: 'truth',
      title: 'Truth Teller',
      description: 'Gave honest self-reflection for 7 days',
      icon: Target,
      color: '#4ECDC4',
      earned: false, // FIXED: Start with no badges earned
      rarity: 'epic' as const,
      points: 300,
    },
    {
      id: 'focus',
      title: 'Focus Warrior',
      description: 'Avoided distractions for 7 consecutive days',
      icon: Target,
      color: '#FFB347',
      earned: false, // FIXED: Start with no badges earned
      rarity: 'rare' as const,
      points: 250,
    },
    {
      id: 'discipline',
      title: 'Discipline King',
      description: 'Completed all 3 checklists for 10 days',
      icon: Trophy,
      color: '#9B59B6',
      earned: false, // FIXED: Start with no badges earned
      rarity: 'legendary' as const,
      points: 500,
    },
  ];

  const getStreakMultiplier = () => {
    if (currentStreak >= 21) return 5;
    if (currentStreak >= 14) return 3;
    if (currentStreak >= 7) return 2;
    return 1;
  };

  const toggleTask = (listType: string, taskId: number) => {
    const updateList = (list: ChecklistItem[], setList: any) => {
      const updated = list.map(item => {
        if (item.id === taskId) {
          const newCompleted = !item.completed;
          if (newCompleted) {
            const basePoints = item.points;
            const multiplier = getStreakMultiplier();
            const earnedPoints = basePoints * multiplier;
            
            setTotalPoints(prev => prev + earnedPoints);
            
            // FIXED: Add to animation queue with the ACTUAL points earned
            animationQueue.addAnimation({
              points: basePoints, // Show base points in animation
              type: multiplier > 1 ? 'streak' : 'checklist',
              source: item.task,
              multiplier: multiplier, // Show multiplier separately
            });
            
            // Check for badge unlocks
            checkBadgeUnlocks(earnedPoints);
          } else {
            const basePoints = item.points;
            const multiplier = getStreakMultiplier();
            setTotalPoints(prev => prev - (basePoints * multiplier));
          }
          return { ...item, completed: newCompleted };
        }
        return item;
      });
      setList(updated);
    };

    switch (listType) {
      case 'morning':
        updateList(morningChecklist, setMorningChecklist);
        break;
      case 'afternoon':
        updateList(afternoonChecklist, setAfternoonChecklist);
        break;
      case 'night':
        updateList(nightChecklist, setNightChecklist);
        break;
    }
  };

  const checkBadgeUnlocks = (earnedPoints: number) => {
    // Simple badge unlock logic - unlock first badge at 100 points
    if (totalPoints + earnedPoints >= 100 && !characterBadges.find(b => b.id === 'helper')?.earned) {
      const helperBadge = characterBadges.find(b => b.id === 'helper');
      if (helperBadge) {
        helperBadge.earned = true;
        setUnlockedBadge(helperBadge);
        setShowBadgeUnlock(true);
      }
    }
  };

  const handleVoiceJournalComplete = (duration: number) => {
    setHasVoiceJournal(true);
    const basePoints = 25;
    const bonusPoints = Math.floor(duration / 30) * 5;
    const totalEarnedPoints = basePoints + bonusPoints;
    
    setTotalPoints(prev => prev + totalEarnedPoints);
    
    // FIXED: Add to animation queue with actual calculated points
    animationQueue.addAnimation({
      points: totalEarnedPoints,
      type: 'voice',
      source: 'voice reflection',
    });
  };

  const handleMetricUpdate = (metricId: string, value: number) => {
    console.log(`Updated ${metricId} to ${value}`);
  };

  const handleBadgePress = (badge: any) => {
    if (badge.earned) {
      Alert.alert(
        `🏆 ${badge.title}`,
        `${badge.description}\n\nRarity: ${badge.rarity.toUpperCase()}\nPoints: ${badge.points}`,
        [{ text: 'Awesome!', style: 'default' }]
      );
    } else {
      Alert.alert(
        `🔒 ${badge.title}`,
        `${badge.description}\n\nKeep working towards this badge!\nReward: ${badge.points} points`,
        [{ text: 'Got it!', style: 'default' }]
      );
    }
  };

  const handleMentorMessage = (message: string) => {
    Alert.alert('Message Sent!', 'Your mentor will respond soon. Keep up the great work!');
  };

  const getTotalDailyProgress = () => {
    const allTasks = [...morningChecklist, ...afternoonChecklist, ...nightChecklist];
    const completed = allTasks.filter(task => task.completed).length;
    return Math.round((completed / allTasks.length) * 100);
  };

  const getLevelInfo = () => {
    const levels = [
      { level: 1, title: 'Character Explorer', min: 0, max: 100 },
      { level: 2, title: 'Habit Builder', min: 100, max: 300 },
      { level: 3, title: 'Discipline Warrior', min: 300, max: 600 },
      { level: 4, title: 'Character Champion', min: 600, max: 1000 },
      { level: 5, title: 'Swabhav Hero', min: 1000, max: 1500 },
    ];
    
    return levels.find(l => totalPoints >= l.min && totalPoints < l.max) || levels[levels.length - 1];
  };

  const levelInfo = getLevelInfo();
  const xpForNextLevel = levelInfo.max - levelInfo.min;
  const currentXP = totalPoints - levelInfo.min;

  return (
    <PointsAnimationManager>
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.userSection}>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>New Character Builder ⭐</Text>
            </View>
            <View style={styles.streakContainer}>
              <View style={styles.streakBadge}>
                <StreakFlame streakDays={currentStreak} size={16} />
                <Text style={styles.streakText}>{currentStreak} Day Streak!</Text>
              </View>
              <Text style={styles.levelText}>Level {levelInfo.level} • {levelInfo.title}</Text>
            </View>
          </View>
          
          <View style={styles.progressOverview}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>{getTotalDailyProgress()}%</Text>
              <Text style={styles.progressLabel}>Daily Progress</Text>
            </View>
            <View style={styles.dailyStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Points</Text>
                <Text style={styles.statValue}>{totalPoints.toLocaleString()}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Voice Journal</Text>
                <Text style={styles.statValue}>{hasVoiceJournal ? '✓' : '○'}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Level Progress */}
          <View style={styles.section}>
            <LevelProgressBar
              currentLevel={levelInfo.level}
              currentXP={currentXP}
              xpForNextLevel={xpForNextLevel}
              totalXP={totalPoints}
              onLevelUp={() => Alert.alert('🚀 Level Up!', 'Congratulations! You\'ve reached a new level!')}
            />
          </View>

          {/* Character Badges */}
          <BadgeShowcase badges={characterBadges} onBadgePress={handleBadgePress} />

          {/* Mentor Connection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💬 Connect with Your Mentor</Text>
            <MentorConnection 
              mentorName="Sarah Wilson"
              onSendMessage={handleMentorMessage}
            />
          </View>

          {/* Daily Checklists */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Daily Character Building</Text>
            
            <GameifiedChecklistCard
              title="🌅 Morning Checklist"
              icon={Sun}
              checklist={morningChecklist}
              onToggleTask={(taskId) => toggleTask('morning', taskId)}
              gradient={['#FF6B6B', '#FF8E53']}
              timeOfDay="morning"
              streakMultiplier={getStreakMultiplier()}
            />

            <GameifiedChecklistCard
              title="☀️ Afternoon Checklist"
              icon={Sunset}
              checklist={afternoonChecklist}
              onToggleTask={(taskId) => toggleTask('afternoon', taskId)}
              gradient={['#4ECDC4', '#44A08D']}
              timeOfDay="afternoon"
              streakMultiplier={getStreakMultiplier()}
            />

            <GameifiedChecklistCard
              title="🌙 Night Checklist"
              icon={Moon}
              checklist={nightChecklist}
              onToggleTask={(taskId) => toggleTask('night', taskId)}
              gradient={['#9B59B6', '#8E44AD']}
              timeOfDay="night"
              streakMultiplier={getStreakMultiplier()}
            />
          </View>

          {/* Voice Journal */}
          <View style={styles.section}>
            <VoiceJournal onRecordingComplete={handleVoiceJournalComplete} />
          </View>

          {/* Character Tracker */}
          <View style={styles.section}>
            <CharacterTracker onMetricUpdate={handleMetricUpdate} />
          </View>

          {/* Motivation Quote */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.motivationCard}
          >
            <Text style={styles.motivationText}>
              "Character is like a tree and reputation like a shadow. The shadow is what we think of it; the tree is the real thing."
            </Text>
            <Text style={styles.motivationAuthor}>- Abraham Lincoln</Text>
          </LinearGradient>
        </ScrollView>

        {/* Badge Unlock Animation (separate from points queue) */}
        <BadgeUnlockAnimation
          badge={unlockedBadge}
          visible={showBadgeUnlock}
          onComplete={() => {
            setShowBadgeUnlock(false);
            setUnlockedBadge(null);
          }}
        />
      </View>
    </PointsAnimationManager>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  streakContainer: {
    alignItems: 'flex-end',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 8,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  levelText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  progressOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dailyStats: {
    flex: 1,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: -10,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  motivationCard: {
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  motivationText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  motivationAuthor: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});