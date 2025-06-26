import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Alert, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, ChevronRight, Sparkles } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function NameCollectionScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const waveAnim = useRef(new Animated.Value(0)).current;
  const continueAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Character wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (name.trim().length >= 2) {
      setShowContinue(true);
      Animated.spring(continueAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      setShowContinue(false);
      Animated.timing(continueAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [name]);

  const handleContinue = () => {
    if (name.trim().length < 2) {
      Alert.alert('Please enter your name', 'We need to know what to call you!');
      return;
    }
    
    router.push({
      pathname: '/(onboarding)/role-selection',
      params: { userName: name.trim() }
    });
  };

  const waveRotation = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '10deg'],
  });

  return (
    <LinearGradient
      colors={['#4ECDC4', '#44A08D']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Character Illustration */}
          <View style={styles.characterContainer}>
            <Animated.View
              style={[
                styles.characterCircle,
                {
                  transform: [{ rotate: waveRotation }],
                },
              ]}
            >
              <User size={64} color="#FFFFFF" />
            </Animated.View>
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                {name ? `Hi ${name}! 👋` : "What should we call you?"}
              </Text>
            </View>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.title}>What's your name?</Text>
            <Text style={styles.subtitle}>
              We'll personalize your character development journey
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your name"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={name}
                onChangeText={setName}
                autoFocus={true}
                maxLength={30}
              />
              <View style={styles.inputUnderline} />
            </View>

            {name.trim() && (
              <View style={styles.greetingContainer}>
                <Sparkles size={20} color="#FFD700" />
                <Text style={styles.greetingText}>
                  Great to meet you, {name}!
                </Text>
                <Sparkles size={20} color="#FFD700" />
              </View>
            )}
          </View>

          {/* Continue Button */}
          <Animated.View
            style={[
              styles.continueContainer,
              {
                opacity: continueAnim,
                transform: [
                  {
                    translateY: continueAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.continueButton, !showContinue && styles.disabledButton]}
              onPress={handleContinue}
              disabled={!showContinue}
            >
              <LinearGradient
                colors={showContinue ? ['#FF6B6B', '#FF8E53'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.continueGradient}
              >
                <Text style={[styles.continueText, !showContinue && styles.disabledText]}>
                  Continue
                </Text>
                <ChevronRight size={20} color={showContinue ? "#FFFFFF" : "rgba(255,255,255,0.3)"} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipText}>
              💡 Your name helps us create a personal connection throughout your character journey
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  characterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  speechText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    textAlign: 'center',
  },
  inputSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  inputUnderline: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  continueContainer: {
    alignItems: 'center',
  },
  continueButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  tipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
});