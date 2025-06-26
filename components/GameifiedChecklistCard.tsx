import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle2, Circle, Sparkles } from 'lucide-react-native';
import { animationQueue } from './PointsAnimationManager';
import CelebrationOverlay from './CelebrationOverlay';

const { width } = Dimensions.get('window');

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
  points: number;
}

interface GameifiedChecklistCardProps {
  title: string;
  icon: any;
  checklist: ChecklistItem[];
  onToggleTask: (taskId: number) => void;
  gradient: string[];
  timeOfDay: 'morning' | 'afternoon' | 'night';
  streakMultiplier?: number;
}

export default function GameifiedChecklistCard({ 
  title, 
  icon: IconComponent, 
  checklist, 
  onToggleTask, 
  gradient,
  timeOfDay,
  streakMultiplier = 1
}: GameifiedChecklistCardProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [animatingTaskId, setAnimatingTaskId] = useState<number | null>(null);
  
  const completionPercentage = Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100);
  const totalPoints = checklist.filter(item => item.completed).reduce((sum, item) => sum + item.points, 0);
  const isComplete = completionPercentage === 100;
  
  const taskAnims = useRef(
    checklist.reduce((acc, item) => {
      acc[item.id] = {
        scale: new Animated.Value(1),
        glow: new Animated.Value(0),
      };
      return acc;
    }, {} as Record<number, { scale: Animated.Value; glow: Animated.Value }>)
  ).current;

  const handleTaskToggle = (taskId: number) => {
    const task = checklist.find(item => item.id === taskId);
    if (!task) return;

    setAnimatingTaskId(taskId);
    
    // Animate the task being completed
    if (!task.completed) {
      const taskAnim = taskAnims[taskId];
      
      Animated.sequence([
        Animated.parallel([
          Animated.spring(taskAnim.scale, {
            toValue: 1.1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(taskAnim.glow, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(taskAnim.scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(taskAnim.glow, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setAnimatingTaskId(null);
      });

      // Add to animation queue instead of showing immediately
      animationQueue.addAnimation({
        points: task.points,
        type: streakMultiplier > 1 ? 'streak' : 'checklist',
        source: task.task,
        multiplier: streakMultiplier,
      });
      
      // Check if checklist is complete after this task
      const completedAfterThis = checklist.filter(item => item.completed || item.id === taskId).length;
      if (completedAfterThis === checklist.length) {
        setTimeout(() => {
          setShowCelebration(true);
        }, 2500); // Delay to let points animation finish
      }
    }
    
    onToggleTask(taskId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={styles.iconContainer}>
              <IconComponent size={24} color="#FFFFFF" />
              {isComplete && (
                <View style={styles.completeBadge}>
                  <Sparkles size={16} color="#FFD700" />
                </View>
              )}
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.pointsEarned}>
                +{totalPoints * streakMultiplier} points earned
                {streakMultiplier > 1 && (
                  <Text style={styles.multiplierText}> ({streakMultiplier}x streak!)</Text>
                )}
              </Text>
            </View>
            <View style={[styles.completionBadge, isComplete && styles.completeBadge]}>
              <Text style={styles.completionText}>{completionPercentage}%</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${completionPercentage}%`,
                    backgroundColor: isComplete ? '#00ff88' : '#FFFFFF',
                  }
                ]} 
              />
              {isComplete && (
                <View style={styles.progressGlow} />
              )}
            </View>
            {isComplete && (
              <View style={styles.celebrationContainer}>
                <Text style={styles.celebrationText}>🎉 Complete! Amazing work! 🎉</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {checklist.map((item) => {
          const taskAnim = taskAnims[item.id];
          const isAnimating = animatingTaskId === item.id;
          
          return (
            <Animated.View
              key={item.id}
              style={[
                {
                  transform: [{ scale: taskAnim?.scale || 1 }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.checklistItem, 
                  item.completed && styles.completedItem,
                  isAnimating && styles.animatingItem,
                ]}
                onPress={() => handleTaskToggle(item.id)}
                activeOpacity={0.7}
              >
                {taskAnim && (
                  <Animated.View
                    style={[
                      styles.taskGlow,
                      {
                        opacity: taskAnim.glow,
                        backgroundColor: '#00ff88' + '40',
                      },
                    ]}
                  />
                )}
                
                <View style={styles.checkboxContainer}>
                  {item.completed ? (
                    <View style={styles.completedCheckbox}>
                      <CheckCircle2 size={24} color="#00ff88" />
                      <View style={styles.checkGlow} />
                    </View>
                  ) : (
                    <Circle size={24} color="rgba(255, 255, 255, 0.3)" />
                  )}
                </View>
                
                <View style={styles.taskContent}>
                  <Text style={[styles.taskText, item.completed && styles.completedText]}>
                    {item.task}
                  </Text>
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>+{item.points} points</Text>
                    {streakMultiplier > 1 && (
                      <Text style={styles.streakMultiplier}>
                        ({streakMultiplier}x)
                      </Text>
                    )}
                  </View>
                </View>
                
                {item.completed && (
                  <View style={styles.completedIndicator}>
                    <Sparkles size={16} color="#FFD700" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Celebration Overlay */}
      <CelebrationOverlay
        visible={showCelebration}
        type="checklist"
        message={`${title} completed! You're building amazing character habits!`}
        onComplete={() => setShowCelebration(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    padding: 20,
  },
  headerContent: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  completeBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pointsEarned: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  multiplierText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  completionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completeBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.3)',
  },
  completionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: '#00ff88' + '40',
    borderRadius: 5,
  },
  celebrationContainer: {
    alignItems: 'center',
  },
  celebrationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  completedItem: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  animatingItem: {
    borderColor: '#00ff88',
    borderWidth: 2,
  },
  taskGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
  },
  checkboxContainer: {
    marginRight: 16,
    position: 'relative',
  },
  completedCheckbox: {
    position: 'relative',
  },
  checkGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: '#00ff88' + '30',
    borderRadius: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
  },
  streakMultiplier: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  completedIndicator: {
    marginLeft: 12,
  },
});