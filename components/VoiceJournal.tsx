import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, MicOff, Play, Pause, RotateCcw } from 'lucide-react-native';
import { animationQueue } from './PointsAnimationManager';

interface VoiceJournalProps {
  onRecordingComplete: (duration: number) => void;
}

export default function VoiceJournal({ onRecordingComplete }: VoiceJournalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);

  const prompts = [
    "What made you proud today?",
    "How did you help someone?",
    "What challenge did you overcome?",
    "What are you grateful for?",
    "How did you show good character?",
  ];

  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 180) { // 3 minutes max
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    // Store timer reference for cleanup
    (startRecording as any).timer = timer;
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    
    if ((startRecording as any).timer) {
      clearInterval((startRecording as any).timer);
    }
    
    // Calculate points based on recording duration (minimum 25, bonus for longer recordings)
    const basePoints = 25;
    const bonusPoints = Math.floor(recordingTime / 30) * 5; // 5 bonus points per 30 seconds
    const totalPoints = basePoints + bonusPoints;
    
    // Add to animation queue instead of showing immediately
    animationQueue.addAnimation({
      points: totalPoints,
      type: 'voice',
      source: 'voice reflection',
    });
    
    // Then show success alert after animation
    setTimeout(() => {
      onRecordingComplete(recordingTime);
      Alert.alert('Recording Complete!', `Great reflection! You earned ${totalPoints} points for voice journaling.`);
    }, 1500);
  };

  const resetRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate current points for preview
  const getCurrentPoints = () => {
    const basePoints = 25;
    const bonusPoints = Math.floor(recordingTime / 30) * 5;
    return basePoints + bonusPoints;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9B59B6', '#8E44AD']}
        style={styles.header}
      >
        <Text style={styles.title}>🎤 Voice Journal</Text>
        <Text style={styles.subtitle}>Share your thoughts and reflections</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.promptContainer}>
          <Text style={styles.promptLabel}>Today's Prompt:</Text>
          <Text style={styles.promptText}>"{currentPrompt}"</Text>
        </View>

        <View style={styles.recordingContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isRecording ? ['#FF6B6B', '#FF8E53'] : ['#4ECDC4', '#44A08D']}
              style={styles.recordButtonGradient}
            >
              {isRecording ? (
                <MicOff size={32} color="#FFFFFF" />
              ) : (
                <Mic size={32} color="#FFFFFF" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
          
          <Text style={styles.recordingStatus}>
            {isRecording ? 'Recording...' : hasRecording ? 'Recording Complete!' : 'Tap to start recording'}
          </Text>
          
          {isRecording && recordingTime > 0 && (
            <Text style={styles.pointsPreview}>
              Current: {getCurrentPoints()} points
            </Text>
          )}
        </View>

        {hasRecording && (
          <View style={styles.playbackContainer}>
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <Play size={20} color="#4ECDC4" />
              <Text style={styles.playButtonText}>Play Recording</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetButton} onPress={resetRecording} activeOpacity={0.8}>
              <RotateCcw size={20} color="#FF6B6B" />
              <Text style={styles.resetButtonText}>Record Again</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Recording Tips:</Text>
          <Text style={styles.tipText}>• Speak clearly and from the heart</Text>
          <Text style={styles.tipText}>• Take your time to think</Text>
          <Text style={styles.tipText}>• Be honest about your experiences</Text>
          <Text style={styles.tipText}>• Longer recordings earn bonus points!</Text>
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
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  promptLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    fontWeight: '600',
  },
  promptText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  recordingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  recordButton: {
    marginBottom: 16,
  },
  recordingButton: {
    transform: [{ scale: 1.1 }],
  },
  recordButtonGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingTime: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recordingStatus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  pointsPreview: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
    marginTop: 4,
  },
  playbackContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    lineHeight: 16,
  },
});