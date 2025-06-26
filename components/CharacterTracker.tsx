import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Target, Clock, Users, Plus, Minus } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { animationQueue } from './PointsAnimationManager';

interface CharacterMetric {
  id: string;
  title: string;
  value: number;
  maxValue: number;
  icon: any;
  color: string;
  type: 'slider' | 'counter';
}

interface CharacterTrackerProps {
  onMetricUpdate: (metricId: string, value: number) => void;
}

export default function CharacterTracker({ onMetricUpdate }: CharacterTrackerProps) {
  const [metrics, setMetrics] = useState<CharacterMetric[]>([
    {
      id: 'gratitude',
      title: 'Gratitude Level',
      value: 7,
      maxValue: 10,
      icon: Heart,
      color: '#FF6B6B',
      type: 'slider',
    },
    {
      id: 'honesty',
      title: 'Honesty Moments',
      value: 3,
      maxValue: 10,
      icon: Target,
      color: '#4ECDC4',
      type: 'counter',
    },
    {
      id: 'helping',
      title: 'Times Helped Others',
      value: 2,
      maxValue: 10,
      icon: Users,
      color: '#45B7D1',
      type: 'counter',
    },
    {
      id: 'focus',
      title: 'Focus Quality',
      value: 8,
      maxValue: 10,
      icon: Clock,
      color: '#9B59B6',
      type: 'slider',
    },
  ]);

  const updateMetric = (metricId: string, newValue: number) => {
    const metric = metrics.find(m => m.id === metricId);
    if (!metric) return;

    const clampedValue = Math.max(0, Math.min(metric.maxValue, newValue));
    const oldValue = metric.value;
    
    setMetrics(prev => prev.map(metric => 
      metric.id === metricId 
        ? { ...metric, value: clampedValue }
        : metric
    ));
    
    onMetricUpdate(metricId, clampedValue);
    
    // Show points animation for increases
    if (clampedValue > oldValue) {
      const pointsEarned = (clampedValue - oldValue) * 5; // 5 points per unit increase
      
      // Add to animation queue
      animationQueue.addAnimation({
        points: pointsEarned,
        type: 'character',
        source: metric.title,
      });
    }
  };

  const renderSlider = (metric: CharacterMetric) => (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={metric.maxValue}
        value={metric.value}
        onValueChange={(value) => updateMetric(metric.id, Math.round(value))}
        minimumTrackTintColor={metric.color}
        maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
        thumbStyle={{ backgroundColor: metric.color }}
      />
      <Text style={styles.sliderValue}>{metric.value}/{metric.maxValue}</Text>
    </View>
  );

  const renderCounter = (metric: CharacterMetric) => (
    <View style={styles.counterContainer}>
      <TouchableOpacity
        style={[styles.counterButton, { backgroundColor: metric.color + '20' }]}
        onPress={() => updateMetric(metric.id, metric.value - 1)}
        activeOpacity={0.7}
      >
        <Minus size={16} color={metric.color} />
      </TouchableOpacity>
      
      <Text style={styles.counterValue}>{metric.value}</Text>
      
      <TouchableOpacity
        style={[styles.counterButton, { backgroundColor: metric.color + '20' }]}
        onPress={() => updateMetric(metric.id, metric.value + 1)}
        activeOpacity={0.7}
      >
        <Plus size={16} color={metric.color} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.title}>📊 Character Tracker</Text>
        <Text style={styles.subtitle}>Track your daily character growth</Text>
      </LinearGradient>

      <View style={styles.content}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                <metric.icon size={20} color={metric.color} />
              </View>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
            
            {metric.type === 'slider' ? renderSlider(metric) : renderCounter(metric)}
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(metric.value / metric.maxValue) * 100}%`,
                    backgroundColor: metric.color 
                  }
                ]} 
              />
            </View>
          </View>
        ))}

        <View style={styles.reflectionPrompt}>
          <Text style={styles.reflectionTitle}>🤔 Daily Reflection</Text>
          <Text style={styles.reflectionText}>
            "How did I show good character today? What can I improve tomorrow?"
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 20,
  },
  metricCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
    minWidth: 40,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 20,
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 40,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  reflectionPrompt: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  reflectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  reflectionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});