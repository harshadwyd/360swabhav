import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, Minus, CircleHelp as HelpCircle } from 'lucide-react-native';
import InteractiveTooltip from './InteractiveTooltip';

interface ProgressExplanationProps {
  title: string;
  percentage: number;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color: string;
  onPress?: () => void;
}

export default function ProgressExplanation({
  title,
  percentage,
  description,
  trend,
  trendValue,
  color,
  onPress
}: ProgressExplanationProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color="#00ff88" />;
      case 'down':
        return <TrendingDown size={16} color="#FF6B6B" />;
      default:
        return <Minus size={16} color="#FFB347" />;
    }
  };

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excellent', color: '#00ff88', emoji: '🌟' };
    if (percentage >= 80) return { level: 'Great', color: '#4ECDC4', emoji: '👍' };
    if (percentage >= 70) return { level: 'Good', color: '#FFB347', emoji: '👌' };
    if (percentage >= 60) return { level: 'Fair', color: '#FF8C42', emoji: '📈' };
    return { level: 'Needs Focus', color: '#FF6B6B', emoji: '🎯' };
  };

  const performance = getPerformanceLevel();

  const getDetailedExplanation = () => {
    switch (title) {
      case 'Skills':
        return `You've mastered ${Math.round(percentage * 0.1)} out of 10 core character traits. ${performance.level} progress! Focus on empathy and patience to reach the next level.`;
      case 'Activities':
        return `You're completing ${percentage}% of your daily character-building activities. ${performance.level} consistency! Keep up this momentum to build lasting habits.`;
      case 'Goals':
        return `You've achieved ${Math.round(percentage * 0.1)} out of 10 weekly character goals. ${performance.level} achievement rate! Set smaller, achievable goals to improve.`;
      default:
        return description;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <InteractiveTooltip
          title={`${title} Explained`}
          content={getDetailedExplanation()}
        >
          <Text style={styles.title}>{title}</Text>
        </InteractiveTooltip>
        
        {trend && trendValue && (
          <View style={styles.trendContainer}>
            {getTrendIcon()}
            <Text style={[styles.trendText, { color: trend === 'up' ? '#00ff88' : trend === 'down' ? '#FF6B6B' : '#FFB347' }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.progressContainer}>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
        <View style={[styles.performanceBadge, { backgroundColor: performance.color + '20' }]}>
          <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
          <Text style={[styles.performanceText, { color: performance.color }]}>
            {performance.level}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: color 
            }
          ]} 
        />
      </View>

      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.viewDetailsButton} onPress={onPress}>
        <Text style={styles.viewDetailsText}>View Details →</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  percentage: {
    fontSize: 32,
    fontWeight: '800',
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceEmoji: {
    fontSize: 12,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 12,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
});