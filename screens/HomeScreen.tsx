import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LogOut } from 'lucide-react-native';
import MatrixBackground from '@/components/MatrixBackground';
import GlowingOrb from '@/components/GlowingOrb';
import TimeWeatherDisplay from '@/components/TimeWeatherDisplay';
import ChatMessage from '@/components/ChatMessage';

interface HomeScreenProps {
  onLogout: () => void;
}

// Mocked chat messages for demonstration
const initialMessages = [
  { id: '1', text: 'Hello, I am KISKA. How can I assist you today?', isUser: false },
];

export default function HomeScreen({ onLogout }: HomeScreenProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Mock response from KISKA after a short delay
    setTimeout(() => {
      const kiskaResponse = {
        id: (Date.now() + 1).toString(),
        text: `I've processed your request: "${inputMessage}"`,
        isUser: false,
      };
      setMessages(prev => [...prev, kiskaResponse]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <MatrixBackground />
      
      <View style={styles.header}>
        <TimeWeatherDisplay />
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <LogOut size={20} color="#66CCFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.orbContainer}>
          <GlowingOrb />
        </View>
        
        <Text style={styles.welcomeText}>KISKA</Text>
        <Text style={styles.statusText}>SYSTEM ONLINE</Text>
        
        <View style={styles.statsContainer}>
          <BlurView intensity={15} tint="dark" style={styles.statCard}>
            <Text style={styles.statLabel}>SYSTEM STATUS</Text>
            <Text style={styles.statValue}>OPERATIONAL</Text>
          </BlurView>
          
          <BlurView intensity={15} tint="dark" style={styles.statCard}>
            <Text style={styles.statLabel}>SECURITY LEVEL</Text>
            <Text style={styles.statValue}>ALPHA</Text>
          </BlurView>
          
          <BlurView intensity={15} tint="dark" style={styles.statCard}>
            <Text style={styles.statLabel}>ACTIVE PROTOCOLS</Text>
            <Text style={styles.statValue}>4</Text>
          </BlurView>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatSection}
        >
          <BlurView intensity={15} tint="dark" style={styles.chatContainer}>
            <Text style={styles.chatTitle}>COMMUNICATION INTERFACE</Text>
            
            <ScrollView 
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message.text} 
                  isUser={message.isUser} 
                />
              ))}
            </ScrollView>
            
            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Chat with KISKA..."
                placeholderTextColor="rgba(102, 204, 255, 0.5)"
                value={inputMessage}
                onChangeText={setInputMessage}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={sendMessage}
                disabled={inputMessage.trim() === ''}
              >
                <Text style={styles.sendButtonText}>SEND</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  orbContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  welcomeText: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: '#66CCFF',
    textAlign: 'center',
    letterSpacing: 8,
    textShadowColor: '#66CCFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statusText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
    color: 'rgba(102, 204, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 10,
    color: 'rgba(102, 204, 255, 0.7)',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 14,
    color: '#66CCFF',
  },
  chatSection: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  chatTitle: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 14,
    color: '#66CCFF',
    marginBottom: 16,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    color: '#66CCFF',
    fontFamily: 'RobotoMono-Regular',
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  sendButton: {
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(102, 204, 255, 0.15)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.5)',
  },
  sendButtonText: {
    fontFamily: 'RobotoMono-Bold',
    color: '#66CCFF',
    fontSize: 12,
  },
});