import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Activity, Apple, Heart, Trophy, Mic, MicOff, Camera, Send } from 'lucide-react-native';
import { animationQueue } from '@/components/PointsAnimationManager';

export default function TrackScreen() {
  const [selectedCategory, setSelectedCategory] = useState('behavior');
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');

  const categories = [
    { id: 'behavior', title: 'Character', icon: Heart, color: '#FF6B6B' },
    { id: 'nutrition', title: 'Nutrition', icon: Apple, color: '#4ECDC4' },
    { id: 'activity', title: 'Activity', icon: Activity, color: '#FFB347' },
    { id: 'skills', title: 'Skills', icon: Trophy, color: '#A8E6CF' },
  ];

  const quickActions = {
    behavior: [
      { text: 'Helped a teammate without being asked', points: 100 },
      { text: 'Told the truth even when it was difficult', points: 75 },
      { text: 'Showed patience during practice', points: 50 },
      { text: 'Practiced gratitude (3 things)', points: 25 },
      { text: 'Demonstrated good sportsmanship', points: 75 },
    ],
    nutrition: [
      { text: 'Had a healthy breakfast with protein', points: 25 },
      { text: 'Drank 8 glasses of water today', points: 20 },
      { text: 'Ate 5 servings of fruits and vegetables', points: 30 },
      { text: 'Avoided junk food when tempted', points: 40 },
      { text: 'Had proper pre-workout nutrition', points: 25 },
    ],
    activity: [
      { text: 'Completed morning exercise routine', points: 50 },
      { text: 'Attended full training session', points: 75 },
      { text: 'Did extra skill practice (30+ mins)', points: 60 },
      { text: 'Participated in team building activity', points: 40 },
      { text: 'Helped with equipment setup/cleanup', points: 30 },
    ],
    skills: [
      { text: 'Improved ball control technique', points: 50 },
      { text: 'Practiced shooting accuracy (100+ shots)', points: 60 },
      { text: 'Worked on endurance training', points: 40 },
      { text: 'Enhanced teamwork communication', points: 45 },
      { text: 'Learned new technique from coach', points: 55 },
    ],
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        
        // Add voice recording to animation queue
        animationQueue.addAnimation({
          points: 25,
          type: 'voice',
          source: 'voice reflection',
        });
        
        setTimeout(() => {
          Alert.alert('Voice Entry Recorded!', 'Great reflection! You earned 25 points for voice journaling.');
        }, 1500);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const handleQuickAction = (action: any) => {
    // Add to animation queue with the ACTUAL points from the action
    animationQueue.addAnimation({
      points: action.points,
      type: selectedCategory === 'behavior' ? 'character' : 'normal',
      source: action.text,
    });
    
    // Then show success alert
    setTimeout(() => {
      Alert.alert(
        'Activity Logged! 🎉',
        `"${action.text}" has been recorded successfully!\n\nYou earned ${action.points} points!`,
        [{ text: 'Awesome!', style: 'default' }]
      );
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    // Calculate points based on category and text length
    const basePoints = selectedCategory === 'behavior' ? 50 : 25;
    const lengthBonus = Math.floor(inputText.trim().length / 20) * 5; // 5 bonus points per 20 characters
    const totalPoints = basePoints + lengthBonus;
    
    // Add to animation queue with calculated points
    animationQueue.addAnimation({
      points: totalPoints,
      type: selectedCategory === 'behavior' ? 'character' : 'normal',
      source: inputText.trim(),
    });
    
    // Then show success alert
    setTimeout(() => {
      Alert.alert(
        'Activity Logged! 🎉',
        `"${inputText}" has been recorded successfully!\n\nYou earned ${totalPoints} points!`,
        [
          {
            text: 'Great!',
            onPress: () => setInputText(''),
          },
        ]
      );
    }, 1500);
  };

  const getSelectedCategoryData = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const recentEntries = [
    { title: 'Helped teammate with technique', category: 'behavior', time: '2 hours ago', points: '+100', icon: Heart },
    { title: 'Completed strength training', category: 'activity', time: '4 hours ago', points: '+50', icon: Activity },
    { title: 'Healthy post-workout meal', category: 'nutrition', time: '5 hours ago', points: '+25', icon: Apple },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Track Progress</Text>
        <Text style={styles.headerSubtitle}>Log your character development journey</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Select Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.8}
              >
                <View 
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + '20' }
                  ]}
                >
                  <category.icon 
                    size={24} 
                    color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
                  />
                </View>
                <Text 
                  style={[
                    styles.categoryTitle,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Voice Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎤 Voice Reflection</Text>
          <TouchableOpacity
            style={[
              styles.voiceButton,
              isRecording && styles.voiceButtonActive
            ]}
            onPress={handleVoiceRecording}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isRecording ? ['#FF6B6B', '#FF8E53'] : ['#4ECDC4', '#44A08D']}
              style={styles.voiceButtonGradient}
            >
              {isRecording ? (
                <MicOff size={32} color="#FFFFFF" />
              ) : (
                <Mic size={32} color="#FFFFFF" />
              )}
              <Text style={styles.voiceButtonText}>
                {isRecording ? 'Stop Recording' : 'Start Voice Reflection'}
              </Text>
              <Text style={styles.voiceButtonSubtext}>
                {isRecording ? 'Recording...' : 'Tap and speak your thoughts (25 points)'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Log Actions</Text>
          <View style={styles.quickActionsList}>
            {quickActions[selectedCategory as keyof typeof quickActions]?.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={() => handleQuickAction(action)}
                activeOpacity={0.8}
              >
                <View 
                  style={[
                    styles.quickActionIcon,
                    { backgroundColor: getSelectedCategoryData()?.color + '20' }
                  ]}
                >
                  <Plus size={16} color={getSelectedCategoryData()?.color} />
                </View>
                <View style={styles.quickActionContent}>
                  <Text style={styles.quickActionText}>{action.text}</Text>
                  <Text style={styles.quickActionPoints}>+{action.points} points</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Manual Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ Custom Entry</Text>
          <View style={styles.manualInputCard}>
            <TextInput
              style={styles.textInput}
              placeholder={`Describe your ${selectedCategory} activity or reflection...`}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              numberOfLines={4}
              value={inputText}
              onChangeText={setInputText}
              textAlignVertical="top"
            />
            {inputText.trim() && (
              <Text style={styles.pointsPreview}>
                Estimated points: {selectedCategory === 'behavior' ? 50 : 25} + {Math.floor(inputText.trim().length / 20) * 5} bonus
              </Text>
            )}
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                <Camera size={20} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.cameraButtonText}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleManualSubmit}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#4ECDC4']}
                  style={styles.submitButtonGradient}
                >
                  <Send size={16} color="#FFFFFF" />
                  <Text style={styles.submitButtonText}>Log Entry</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Recent Entries</Text>
          <View style={styles.recentEntriesList}>
            {recentEntries.map((entry, index) => (
              <View key={index} style={styles.recentEntry}>
                <View style={styles.recentEntryIcon}>
                  <entry.icon size={16} color={getSelectedCategoryData()?.color || '#4ECDC4'} />
                </View>
                <View style={styles.recentEntryInfo}>
                  <Text style={styles.recentEntryTitle}>{entry.title}</Text>
                  <Text style={styles.recentEntryTime}>{entry.time}</Text>
                </View>
                <View style={styles.recentEntryPoints}>
                  <Text style={styles.pointsText}>{entry.points}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedCategory: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  voiceButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  voiceButtonActive: {
    transform: [{ scale: 0.98 }],
  },
  voiceButtonGradient: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    gap: 8,
  },
  voiceButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  voiceButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickActionsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionPoints: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
  },
  manualInputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textInput: {
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  pointsPreview: {
    fontSize: 12,
    color: '#00ff88',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    gap: 8,
  },
  cameraButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recentEntriesList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  recentEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  recentEntryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recentEntryInfo: {
    flex: 1,
  },
  recentEntryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  recentEntryTime: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  recentEntryPoints: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00ff88',
  },
});