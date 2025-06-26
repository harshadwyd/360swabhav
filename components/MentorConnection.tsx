import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Send, Heart, CircleAlert as AlertCircle, Calendar, User } from 'lucide-react-native';

interface Message {
  id: number;
  sender: 'mentor' | 'student';
  content: string;
  timestamp: string;
  type: 'text' | 'encouragement' | 'check-in';
}

interface MentorConnectionProps {
  mentorName: string;
  onSendMessage: (message: string) => void;
}

export default function MentorConnection({ mentorName, onSendMessage }: MentorConnectionProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'mentor',
      content: 'Hey there! How was your training session today? I saw you completed your morning checklist - that\'s awesome! 🌟',
      timestamp: '2 hours ago',
      type: 'check-in'
    },
    {
      id: 2,
      sender: 'student',
      content: 'Hi! It went really well! I helped my teammate with their technique and it felt great to see them improve.',
      timestamp: '1 hour ago',
      type: 'text'
    },
    {
      id: 3,
      sender: 'mentor',
      content: 'That\'s the spirit! Helping others is one of the most beautiful character traits. You\'re growing into an amazing person! 💪',
      timestamp: '45 minutes ago',
      type: 'encouragement'
    }
  ]);

  const quickResponses = [
    "I need some encouragement today 💙",
    "Can we schedule a check-in call? 📞",
    "I want to share something exciting! ✨",
    "I'm struggling with something 😔"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'student',
      content: message,
      timestamp: 'Just now',
      type: 'text'
    };
    
    setMessages([...messages, newMessage]);
    onSendMessage(message);
    setMessage('');
  };

  const handleQuickResponse = (response: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'student',
      content: response,
      timestamp: 'Just now',
      type: 'text'
    };
    
    setMessages([...messages, newMessage]);
    onSendMessage(response);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.header}
      >
        <View style={styles.mentorInfo}>
          <View style={styles.mentorAvatar}>
            <User size={24} color="#FFFFFF" />
          </View>
          <View style={styles.mentorDetails}>
            <Text style={styles.mentorName}>{mentorName}</Text>
            <Text style={styles.mentorRole}>Your Mentor • Online</Text>
          </View>
        </View>
        
        <View style={styles.connectionStats}>
          <View style={styles.statItem}>
            <Calendar size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.statText}>3 weeks together</Text>
          </View>
          <View style={styles.statItem}>
            <Heart size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.statText}>12 check-ins</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageCard,
              msg.sender === 'student' ? styles.studentMessage : styles.mentorMessage
            ]}
          >
            <Text style={[
              styles.messageContent,
              msg.sender === 'student' ? styles.studentText : styles.mentorText
            ]}>
              {msg.content}
            </Text>
            <Text style={styles.messageTime}>{msg.timestamp}</Text>
            {msg.type === 'encouragement' && (
              <View style={styles.encouragementBadge}>
                <Heart size={12} color="#FF6B6B" />
                <Text style={styles.encouragementText}>Encouragement</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quick Responses */}
      <View style={styles.quickResponsesContainer}>
        <Text style={styles.quickResponsesTitle}>Quick Messages:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickResponsesList}>
            {quickResponses.map((response, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickResponseButton}
                onPress={() => handleQuickResponse(response)}
                activeOpacity={0.8}
              >
                <Text style={styles.quickResponseText}>{response}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.emergencyButton} activeOpacity={0.8}>
          <AlertCircle size={20} color="#FF6B6B" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.messageInput}
          placeholder="Share your thoughts with your mentor..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          activeOpacity={0.8}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)"} />
        </TouchableOpacity>
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
    height: 500,
  },
  header: {
    padding: 20,
  },
  mentorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mentorDetails: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mentorRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  connectionStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  studentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4ECDC4',
  },
  mentorMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  studentText: {
    color: '#FFFFFF',
  },
  mentorText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
  },
  encouragementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
    gap: 4,
  },
  encouragementText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  quickResponsesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickResponsesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  quickResponsesList: {
    flexDirection: 'row',
    gap: 8,
  },
  quickResponseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickResponseText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  emergencyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#FFFFFF',
    maxHeight: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});