import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Target, Trophy, Calendar, TriangleAlert as AlertTriangle, Star, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Student {
  id: string;
  name: string;
  level: number;
  streak: number;
  completionRate: number;
  weeklyProgress: number[];
  goals: { completed: number; total: number };
  riskLevel: 'low' | 'medium' | 'high';
  lastActive: string;
  improvements: string[];
  challenges: string[];
}

interface StudentProgressTrackerProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

export default function StudentProgressTracker({ students, onStudentSelect }: StudentProgressTrackerProps) {
  const [selectedMetric, setSelectedMetric] = useState('completion');
  const [sortBy, setSortBy] = useState('progress');

  const metrics = [
    { id: 'completion', label: 'Completion Rate', icon: Target },
    { id: 'streak', label: 'Streak Days', icon: Trophy },
    { id: 'level', label: 'Character Level', icon: Star },
    { id: 'risk', label: 'Risk Level', icon: AlertTriangle },
  ];

  const sortOptions = [
    { id: 'progress', label: 'Progress' },
    { id: 'name', label: 'Name' },
    { id: 'level', label: 'Level' },
    { id: 'risk', label: 'Risk Level' },
  ];

  const getProgressTrend = (weeklyProgress: number[]) => {
    if (weeklyProgress.length < 2) return 'stable';
    const recent = weeklyProgress.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const previous = weeklyProgress.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
    
    if (recent > previous + 5) return 'up';
    if (recent < previous - 5) return 'down';
    return 'stable';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="#00ff88" />;
      case 'down': return <TrendingDown size={16} color="#FF6B6B" />;
      default: return <Target size={16} color="#FFB347" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#00ff88';
      case 'medium': return '#FFB347';
      case 'high': return '#FF6B6B';
      default: return '#95A5A6';
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'level':
        return b.level - a.level;
      case 'risk':
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      default: // progress
        return b.completionRate - a.completionRate;
    }
  });

  const getMetricValue = (student: Student, metric: string) => {
    switch (metric) {
      case 'completion':
        return `${student.completionRate}%`;
      case 'streak':
        return `${student.streak} days`;
      case 'level':
        return `Level ${student.level}`;
      case 'risk':
        return student.riskLevel.toUpperCase();
      default:
        return '';
    }
  };

  const getMetricColor = (student: Student, metric: string) => {
    switch (metric) {
      case 'completion':
        return student.completionRate >= 80 ? '#00ff88' : student.completionRate >= 60 ? '#FFB347' : '#FF6B6B';
      case 'streak':
        return student.streak >= 7 ? '#00ff88' : student.streak >= 3 ? '#FFB347' : '#FF6B6B';
      case 'level':
        return student.level >= 4 ? '#00ff88' : student.level >= 2 ? '#FFB347' : '#FF6B6B';
      case 'risk':
        return getRiskColor(student.riskLevel);
      default:
        return '#4ECDC4';
    }
  };

  return (
    <View style={styles.container}>
      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.metricsSelector}>
          <Text style={styles.controlLabel}>View by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.metricsButtons}>
              {metrics.map((metric) => (
                <TouchableOpacity
                  key={metric.id}
                  style={[
                    styles.metricButton,
                    selectedMetric === metric.id && styles.selectedMetricButton
                  ]}
                  onPress={() => setSelectedMetric(metric.id)}
                >
                  <metric.icon 
                    size={16} 
                    color={selectedMetric === metric.id ? '#FFFFFF' : '#666'} 
                  />
                  <Text style={[
                    styles.metricButtonText,
                    selectedMetric === metric.id && styles.selectedMetricButtonText
                  ]}>
                    {metric.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.sortSelector}>
          <Text style={styles.controlLabel}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.sortButtons}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortButton,
                    sortBy === option.id && styles.selectedSortButton
                  ]}
                  onPress={() => setSortBy(option.id)}
                >
                  <Text style={[
                    styles.sortButtonText,
                    sortBy === option.id && styles.selectedSortButtonText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Students Grid */}
      <ScrollView style={styles.studentsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.studentsGrid}>
          {sortedStudents.map((student) => {
            const trend = getProgressTrend(student.weeklyProgress);
            const metricValue = getMetricValue(student, selectedMetric);
            const metricColor = getMetricColor(student, selectedMetric);

            return (
              <TouchableOpacity
                key={student.id}
                style={styles.studentCard}
                onPress={() => onStudentSelect(student)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[metricColor + '10', metricColor + '05']}
                  style={styles.studentGradient}
                >
                  <View style={styles.studentHeader}>
                    <View style={styles.studentBasicInfo}>
                      <Text style={styles.studentName}>{student.name}</Text>
                      <Text style={styles.studentLevel}>Level {student.level}</Text>
                    </View>
                    <View style={styles.studentIndicators}>
                      {getTrendIcon(trend)}
                      {student.riskLevel === 'high' && (
                        <AlertTriangle size={16} color="#FF6B6B" />
                      )}
                    </View>
                  </View>

                  <View style={styles.metricDisplay}>
                    <Text style={[styles.metricValue, { color: metricColor }]}>
                      {metricValue}
                    </Text>
                    <Text style={styles.metricLabel}>
                      {metrics.find(m => m.id === selectedMetric)?.label}
                    </Text>
                  </View>

                  <View style={styles.progressVisualization}>
                    <View style={styles.weeklyBars}>
                      {student.weeklyProgress.slice(-7).map((progress, index) => (
                        <View
                          key={index}
                          style={[
                            styles.progressBar,
                            {
                              height: Math.max(4, (progress / 100) * 30),
                              backgroundColor: progress >= 80 ? '#00ff88' : 
                                             progress >= 60 ? '#FFB347' : '#FF6B6B'
                            }
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.progressLabel}>7-day progress</Text>
                  </View>

                  <View style={styles.studentFooter}>
                    <View style={styles.goalProgress}>
                      <Text style={styles.goalText}>
                        Goals: {student.goals.completed}/{student.goals.total}
                      </Text>
                      <View style={styles.goalBar}>
                        <View 
                          style={[
                            styles.goalFill,
                            { 
                              width: `${(student.goals.completed / student.goals.total) * 100}%`,
                              backgroundColor: metricColor
                            }
                          ]} 
                        />
                      </View>
                    </View>
                    <Text style={styles.lastActive}>
                      {student.lastActive}
                    </Text>
                  </View>

                  {/* Quick Insights */}
                  <View style={styles.insights}>
                    {student.improvements.length > 0 && (
                      <View style={styles.insightItem}>
                        <TrendingUp size={12} color="#00ff88" />
                        <Text style={styles.insightText}>
                          Improved: {student.improvements[0]}
                        </Text>
                      </View>
                    )}
                    {student.challenges.length > 0 && (
                      <View style={styles.insightItem}>
                        <AlertTriangle size={12} color="#FFB347" />
                        <Text style={styles.insightText}>
                          Challenge: {student.challenges[0]}
                        </Text>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Summary Stats */}
      <View style={styles.summaryStats}>
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          style={styles.summaryGradient}
        >
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Users size={20} color="#FFFFFF" />
              <Text style={styles.summaryValue}>{students.length}</Text>
              <Text style={styles.summaryLabel}>Total Students</Text>
            </View>
            <View style={styles.summaryItem}>
              <TrendingUp size={20} color="#FFFFFF" />
              <Text style={styles.summaryValue}>
                {Math.round(students.reduce((acc, s) => acc + s.completionRate, 0) / students.length)}%
              </Text>
              <Text style={styles.summaryLabel}>Avg Completion</Text>
            </View>
            <View style={styles.summaryItem}>
              <AlertTriangle size={20} color="#FFFFFF" />
              <Text style={styles.summaryValue}>
                {students.filter(s => s.riskLevel === 'high').length}
              </Text>
              <Text style={styles.summaryLabel}>High Risk</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  controls: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  metricsSelector: {
    marginBottom: 16,
  },
  metricsButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  metricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 6,
  },
  selectedMetricButton: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  metricButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedMetricButtonText: {
    color: '#FFFFFF',
  },
  sortSelector: {},
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedSortButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  selectedSortButtonText: {
    color: '#FFFFFF',
  },
  studentsContainer: {
    flex: 1,
    padding: 16,
  },
  studentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  studentCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studentGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentBasicInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  studentLevel: {
    fontSize: 12,
    color: '#666',
  },
  studentIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricDisplay: {
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  progressVisualization: {
    alignItems: 'center',
    marginBottom: 12,
  },
  weeklyBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 30,
    marginBottom: 4,
  },
  progressBar: {
    width: 6,
    borderRadius: 3,
    minHeight: 4,
  },
  progressLabel: {
    fontSize: 10,
    color: '#666',
  },
  studentFooter: {
    marginBottom: 8,
  },
  goalProgress: {
    marginBottom: 8,
  },
  goalText: {
    fontSize: 12,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  goalBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  goalFill: {
    height: '100%',
    borderRadius: 2,
  },
  lastActive: {
    fontSize: 10,
    color: '#999',
  },
  insights: {
    gap: 4,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightText: {
    fontSize: 10,
    color: '#666',
    flex: 1,
  },
  summaryStats: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 20,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    gap: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});