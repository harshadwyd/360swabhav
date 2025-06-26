import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Chrome as Home, TrendingUp, Trophy, Users, MessageCircle, Target, ChartBar as BarChart3, Star, Heart, Zap, Calendar } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function FeatureTourScreen() {
  const router = useRouter();
  const { userName, selectedRole } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const getPersonalizedTour = () => {
    const baseTour = [
      {
        title: `Welcome to Your Dashboard, ${userName}!`,
        description: 'This is your personal command center where you can see your character growth at a glance.',
        icon: Home,
        color: '#4ECDC4',
        features: [
          'Daily progress overview',
          'Quick access to all features',
          'Personalized motivation',
          'Real-time updates'
        ],
        explanation: `${userName}, this dashboard shows everything you need to build strong character habits. Think of it as your daily character growth headquarters!`
      },
      {
        title: 'Progress Tracking Made Simple',
        description: 'See exactly how you\'re growing with clear, meaningful metrics.',
        icon: TrendingUp,
        color: '#FF6B6B',
        features: [
          'Skills: Shows character trait mastery (85% = 8.5 out of 10 traits)',
          'Activities: Daily habit completion rate',
          'Goals: Weekly character objectives progress',
          'Trends: See if you\'re improving over time'
        ],
        explanation: selectedRole === 'student' 
          ? `${userName}, forget confusing numbers! Your Level 3 means you're a "Discipline Warrior" - you've built strong character habits and you're in the top 25% of character builders!`
          : `${userName}, your professional dashboard shows meaningful impact metrics and student progress data, not gaming elements.`
      },
      {
        title: selectedRole === 'student' ? 'Your Character Level System' : 'Professional Achievement System',
        description: selectedRole === 'student' 
          ? 'Track your character growth through clear levels and meaningful rewards.'
          : 'Recognition for your professional impact and service contributions.',
        icon: Trophy,
        color: '#FFD700',
        features: selectedRole === 'student' 
          ? [
              'Level 1-2: Character Explorer & Habit Builder',
              'Level 3-4: Discipline Warrior & Character Champion', 
              'Level 5+: Swabhav Hero & Character Master',
              'Each level unlocks new features and recognition'
            ]
          : [
              'Teaching Excellence: Consistent student guidance',
              'Mentor Impact: Measurable student character growth',
              'Community Builder: Positive environment creation',
              'Professional development milestones'
            ],
        explanation: selectedRole === 'student'
          ? `${userName}, you earn XP by completing character activities. 100 XP = Level 2, 300 XP = Level 3. It's like a game, but you're building real character!`
          : `${userName}, your achievements recognize real-world impact on character development, focusing on meaningful outcomes rather than points.`
      },
      {
        title: 'Community & Support',
        description: 'Connect with others on the same character-building journey.',
        icon: Users,
        color: '#9B59B6',
        features: [
          'Leaderboard for inspiration (not competition)',
          'Community challenges and group goals',
          'Share achievements and celebrate others',
          'Anonymous peer comparison for motivation'
        ],
        explanation: `${userName}, character growth is better together! See how others are building character, join challenges, and celebrate each other's wins.`
      },
      {
        title: 'Mentor Connection',
        description: 'Get personalized guidance from caring mentors who understand your journey.',
        icon: MessageCircle,
        color: '#45B7D1',
        features: [
          'Direct messaging with assigned mentors',
          'Quick help for immediate encouragement',
          'Emergency support when you need it most',
          'Regular check-ins and progress celebrations'
        ],
        explanation: `${userName}, you're never alone! Your mentors are here to guide, encourage, and support you through every step of your character development.`
      }
    ];

    // Add role-specific features
    if (selectedRole === 'student') {
      baseTour.push({
        title: 'Daily Character Challenges',
        description: 'Build character through fun, engaging daily activities.',
        icon: Target,
        color: '#4ECDC4',
        features: [
          'Morning, afternoon, and evening checklists',
          'Points and streak multipliers for consistency',
          'Voice journaling for reflection',
          'Character trait tracking'
        ],
        explanation: `${userName}, each completed task builds real character while earning you XP. It's designed to feel rewarding while creating lasting positive habits!`
      });
    } else if (selectedRole === 'coach') {
      baseTour.push({
        title: 'Professional Coaching Tools',
        description: 'Guide multiple students with comprehensive tracking and resources.',
        icon: BarChart3,
        color: '#4ECDC4',
        features: [
          'Multi-student progress dashboard',
          'Evidence-based character development resources',
          'Early intervention alerts for concerning patterns',
          'Professional development tracking'
        ],
        explanation: `${userName}, your tools focus on meaningful impact measurement and professional effectiveness, not gaming mechanics.`
      });
    }

    return baseTour;
  };

  const tourSteps = getPersonalizedTour();

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ x: (currentStep + 1) * width, animated: true });
    } else {
      // Tour complete, go to completion screen
      router.push({
        pathname: '/(onboarding)/complete',
        params: { userName, selectedRole }
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ x: (currentStep - 1) * width, animated: true });
    }
  };

  const handleSkip = () => {
    router.push({
      pathname: '/(onboarding)/complete',
      params: { userName, selectedRole }
    });
  };

  const currentTour = tourSteps[currentStep];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[currentTour.color, currentTour.color + '80']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip Tour</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            {tourSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.activeDot,
                  index < currentStep && styles.completedDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content - Made Scrollable */}
        <ScrollView 
          style={styles.contentScrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={styles.horizontalScrollView}
          >
            {tourSteps.map((step, index) => (
              <ScrollView
                key={index}
                style={styles.slideScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.slideContainer}
              >
                <View style={styles.slideContent}>
                  {/* Icon */}
                  <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                    <step.icon size={48} color="#FFFFFF" />
                  </View>

                  {/* Title */}
                  <Text style={styles.slideTitle}>{step.title}</Text>
                  
                  {/* Description */}
                  <Text style={styles.slideDescription}>{step.description}</Text>

                  {/* Features List */}
                  <View style={styles.featuresContainer}>
                    {step.features.map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureItem}>
                        <Star size={16} color="#FFD700" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Personalized Explanation */}
                  <View style={styles.explanationContainer}>
                    <Text style={styles.explanationText}>{step.explanation}</Text>
                  </View>
                </View>
              </ScrollView>
            ))}
          </ScrollView>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, currentStep === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={24} color={currentStep === 0 ? "rgba(255,255,255,0.3)" : "#FFFFFF"} />
            <Text style={[styles.navText, currentStep === 0 && styles.disabledText]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              style={styles.nextGradient}
            >
              <Text style={styles.nextText}>
                {currentStep === tourSteps.length - 1 ? 'Complete Tour' : 'Next'}
              </Text>
              <ChevronRight size={24} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  completedDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  horizontalScrollView: {
    flex: 1,
  },
  slideScrollView: {
    width: width,
    flex: 1,
  },
  slideContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: height * 0.6,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  slideDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  explanationText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.3,
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  nextGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});