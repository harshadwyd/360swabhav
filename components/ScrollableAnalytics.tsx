import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Minus, ChevronRight, ChartBar as BarChart3, ChartPie as PieChart, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  description: string;
}

interface ScrollableAnalyticsProps {
  onMetricPress?: (metric: MetricCard) => void;
}

export default function ScrollableAnalytics({ onMetricPress }: ScrollableAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  
  const periods = ['Week', 'Month', 'Quarter', 'Year'];
  
  const metrics: MetricCard[] = [
    {
      title: 'Character Growth',
      value: '87%',
      change: '+12%',
      trend: 'up',
      color: '#4ECDC4',
      description: 'Your character development is accelerating! Keep up the amazing work.'
    },
    {
      title: 'Daily Consistency',
      value: '92%',
      change: '+8%',
      trend: 'up',
      color: '#FF6B6B',
      description: 'Excellent daily habit formation. You\'re building strong character foundations.'
    },
    {
      title: 'Skill Mastery',
      value: '78%',
      change: '+15%',
      trend: 'up',
      color: '#FFB347',
      description: 'Great progress in skill development. Focus on empathy to reach 85%.'
    },
    {
      title: 'Community Impact',
      value: '85%',
      change: '+5%',
      trend: 'up',
      color: '#9B59B6',
      description: 'Your positive influence on others is growing. Amazing leadership!'
    },
    {
      title: 'Goal Achievement',
      value: '94%',
      change: '+3%',
      trend: 'up',
      color: '#45B7D1',
      description: 'Outstanding goal completion rate. You\'re exceeding expectations!'
    },
    {
      title: 'Mentor Connection',
      value: '96%',
      change: '+7%',
      trend: 'up',
      color: '#A8E6CF',
      description: 'Strong mentor relationship. Regular check-ins are paying off.'
    }
  ];

  const weeklyData = [
    { day: 'Mon', value: 85, label: 'Monday' },
    { day: 'Tue', value: 92, label: 'Tuesday' },
    { day: 'Wed', value: 78, label: 'Wednesday' },
    { day: 'Thu', value: 95, label: 'Thursday' },
    { day: 'Fri', value: 88, label: 'Friday' },
    { day: 'Sat', value: 91, label: 'Saturday' },
    { day: 'Sun', value: 87, label: 'Sunday' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color="#00ff88" />;
      case 'down':
        return <TrendingDown size={16} color="#FF6B6B" />;
      default:
        return <Minus size={16} color="#FFB347" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#00ff88';
      case 'down':
        return '#FF6B6B';
      default:
        return '#FFB347';
    }
  };

  return (
    <View style={styles.container}>
      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.periodButtons}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriod
                ]}
                onPress={() => setSelectedPeriod(period)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.periodText,
                  selectedPeriod === period && styles.selectedPeriodText
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Metrics Grid */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.metricsScroll}
        contentContainerStyle={styles.metricsContainer}
      >
        {metrics.map((metric, index) => (
          <TouchableOpacity
            key={index}
            style={styles.metricCard}
            onPress={() => onMetricPress?.(metric)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[metric.color + '20', metric.color + '10']}
              style={styles.metricGradient}
            >
              <View style={styles.metricHeader}>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <View style={[styles.trendBadge, { backgroundColor: getTrendColor(metric.trend) + '20' }]}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.trendText, { color: getTrendColor(metric.trend) }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.metricValue, { color: metric.color }]}>
                {metric.value}
              </Text>
              
              <Text style={styles.metricDescription} numberOfLines={2}>
                {metric.description}
              </Text>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: metric.value,
                      backgroundColor: metric.color 
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.viewMoreContainer}>
                <Text style={styles.viewMoreText}>View Details</Text>
                <ChevronRight size={14} color="rgba(255, 255, 255, 0.7)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Weekly Progress Chart */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Weekly Character Progress</Text>
          <TouchableOpacity style={styles.chartTypeButton} activeOpacity={0.8}>
            <BarChart3 size={20} color="#4ECDC4" />
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            {weeklyData.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chartBar}
                activeOpacity={0.8}
              >
                <View style={styles.barContainer}>
                  <Text style={styles.barValue}>{data.value}%</Text>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: (data.value / 100) * 120,
                        backgroundColor: data.value >= 90 ? '#00ff88' : 
                                       data.value >= 80 ? '#4ECDC4' : '#FFB347'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.dayLabel}>{data.day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Insights Section */}
      <View style={styles.insightsSection}>
        <Text style={styles.insightsTitle}>📊 Smart Insights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Calendar size={24} color="#4ECDC4" />
              <Text style={styles.insightTitle}>Best Day</Text>
              <Text style={styles.insightText}>Thursdays are your strongest character days</Text>
            </View>
            
            <View style={styles.insightCard}>
              <TrendingUp size={24} color="#00ff88" />
              <Text style={styles.insightTitle}>Growth Trend</Text>
              <Text style={styles.insightText}>15% improvement in consistency this month</Text>
            </View>
            
            <View style={styles.insightCard}>
              <PieChart size={24} color="#FFB347" />
              <Text style={styles.insightTitle}>Focus Area</Text>
              <Text style={styles.insightText}>Work on empathy skills to reach next level</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  periodSelector: {
    marginBottom: 20,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedPeriod: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
  },
  metricsScroll: {
    marginBottom: 24,
  },
  metricsContainer: {
    paddingRight: 20,
    gap: 16,
  },
  metricCard: {
    width: width * 0.75,
    borderRadius: 16,
    overflow: 'hidden',
  },
  metricGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  metricDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewMoreText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  chartSection: {
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chartTypeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    paddingHorizontal: 4,
    paddingRight: 20,
  },
  chartBar: {
    alignItems: 'center',
    minWidth: 50,
  },
  barContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  barValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    minHeight: 20,
  },
  dayLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  insightsSection: {
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  insightsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 20,
  },
  insightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: 140,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 16,
  },
});