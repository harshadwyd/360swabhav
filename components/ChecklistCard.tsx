import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle2, Circle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
  points: number;
}

interface ChecklistCardProps {
  title: string;
  icon: any;
  checklist: ChecklistItem[];
  onToggleTask: (taskId: number) => void;
  gradient: string[];
  timeOfDay: 'morning' | 'afternoon' | 'night';
}

export default function ChecklistCard({ 
  title, 
  icon: IconComponent, 
  checklist, 
  onToggleTask, 
  gradient,
  timeOfDay 
}: ChecklistCardProps) {
  const completionPercentage = Math.round((checklist.filter(item => item.completed).length / checklist.length) * 100);
  const totalPoints = checklist.filter(item => item.completed).reduce((sum, item) => sum + item.points, 0);
  const isComplete = completionPercentage === 100;

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
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.pointsEarned}>+{totalPoints} points earned</Text>
            </View>
            <View style={[styles.completionBadge, isComplete && styles.completeBadge]}>
              <Text style={styles.completionText}>{completionPercentage}%</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${completionPercentage}%` }]} />
            </View>
            {isComplete && (
              <View style={styles.celebrationContainer}>
                <Text style={styles.celebrationText}>🎉 Complete! Amazing work!</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {checklist.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.checklistItem, item.completed && styles.completedItem]}
            onPress={() => onToggleTask(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.checkboxContainer}>
              {item.completed ? (
                <CheckCircle2 size={24} color="#00ff88" />
              ) : (
                <Circle size={24} color="rgba(255, 255, 255, 0.3)" />
              )}
            </View>
            <View style={styles.taskContent}>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.task}
              </Text>
              <Text style={styles.pointsText}>+{item.points} points</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
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
  },
  completedItem: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  checkboxContainer: {
    marginRight: 16,
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
  pointsText: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
  },
});