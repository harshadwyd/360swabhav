import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Sparkles, Trophy, Heart, Target, Users, ChevronRight } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function OnboardingCompleteScreen() {
  const router = useRouter();
  const { userName, selectedRole } = useLocalSearchParams();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const confettiAnims = useRef(
    Array.from({ length: 8 }, () => ({
      translateY: new Animated.Value(-100),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    // Start celebration animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
      ]),
      // Confetti animation
      Animated.parallel(
        confettiAnims.map((anim, index) => {
          const angle = (index * 45) * Math.PI / 180;
          const distance = 150 + Math.random() * 100;
          
          return Animated.parallel([
            Animated.timing(anim.translateY, {
              toValue: 300,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateX, {
              toValue: Math.cos(angle) * distance,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.rotate, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.delay(1500),
              Animated.timing(anim.opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
            ]),
          ]);
        })
      ),
    ]).start();
  }, []);

  const handleStartJourney = () => {
    // Navigate to main app with user data - users start at 0 points
    router.replace('/(tabs)');
  };

  const getRoleSpecificMessage = () => {
    switch (selectedRole) {
      case 'student':
        return {
          title: `Ready to Build Character, ${userName}!`,
          subtitle: 'Your gamified character development adventure begins now',
          features: [
            'Start earning XP with your first daily checklist',
            'Unlock your first achievement badge',
            'Connect with your assigned mentor',
            'Join the character-building community'
          ]
        };
      case 'coach':
        return {
          title: `Welcome to Professional Impact, ${userName}!`,
          subtitle: 'Your coaching dashboard is ready to track meaningful student growth',
          features: [
            'Access your professional coaching dashboard',
            'Review evidence-based character development resources',
            'Connect with students needing guidance',
            'Track your professional impact metrics'
          ]
        };
      case 'volunteer':
        return {
          title: `Thank You for Your Service, ${userName}!`,
          subtitle: 'Your community support tools are ready to make a difference',
          features: [
            'Access community moderation dashboard',
            'Provide peer support and encouragement',
            'Track your service contributions',
            'Help maintain a positive environment'
          ]
        };
      default:
        return {
          title: `Welcome to Leadership, ${userName}!`,
          subtitle: 'Your administrative tools are ready for program management',
          features: [
            'Access system management dashboard',
            'Oversee character development programs',
            'Monitor platform analytics',
            'Coordinate community initiatives'
          ]
        };
    }
  };

  const roleMessage = getRoleSpecificMessage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Confetti */}
        {confettiAnims.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6'][index % 4],
                transform: [
                  { translateX: anim.translateX },
                  { translateY: anim.translateY },
                  {
                    rotate: anim.rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
                opacity: anim.opacity,
              },
            ]}
          />
        ))}

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Success Icon */}
            <View style={styles.successContainer}>
              <View style={styles.successCircle}>
                <Trophy size={64} color="#FFD700" />
              </View>
              <View style={styles.sparkleContainer}>
                <Sparkles size={24} color="#FFD700" style={styles.sparkle1} />
                <Sparkles size={20} color="#FFFFFF" style={styles.sparkle2} />
                <Sparkles size={18} color="#FFD700" style={styles.sparkle3} />
              </View>
            </View>

            {/* Congratulations Message */}
            <View style={styles.messageContainer}>
              <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
              <Text style={styles.titleText}>{roleMessage.title}</Text>
              <Text style={styles.subtitleText}>{roleMessage.subtitle}</Text>
            </View>

            {/* Next Steps */}
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>Your next steps:</Text>
              {roleMessage.features.map((feature, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* Motivational Message */}
            <View style={styles.motivationContainer}>
              <Heart size={20} color="#FF6B6B" />
              <Text style={styles.motivationText}>
                {selectedRole === 'student' 
                  ? `${userName}, character building is a journey, not a destination. Every small action contributes to your growth!`
                  : `${userName}, your role is crucial in developing the next generation of character leaders. Thank you for your commitment!`
                }
              </Text>
              <Heart size={20} color="#FF6B6B" />
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={handleStartJourney}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                style={styles.startGradient}
              >
                <Text style={styles.startText}>
                  {selectedRole === 'student' ? 'Start My Character Adventure' : 'Access My Dashboard'}
                </Text>
                <ChevronRight size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Final Encouragement */}
            <View style={styles.encouragementContainer}>
              <Text style={styles.encouragementText}>
                Ready to begin your character journey, {userName}? 🌟
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: 100,
    left: '50%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sparkleContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
  },
  sparkle1: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  sparkle3: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
    flex: 1,
  },
  motivationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    gap: 12,
  },
  motivationText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
  },
  startButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 12,
  },
  startText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  encouragementContainer: {
    alignItems: 'center',
  },
  encouragementText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
});