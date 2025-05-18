import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.kiskaContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.kiskaBubble
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.kiskaText
        ]}>
          {message}
        </Text>
      </View>
      
      <Text style={styles.timestamp}>
        {isUser ? 'YOU' : 'KISKA'} • {getCurrentTime()}
      </Text>
    </View>
  );
}

// Helper to get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  kiskaContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: 'rgba(102, 204, 255, 0.15)',
    borderColor: 'rgba(102, 204, 255, 0.5)',
  },
  kiskaBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  messageText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
  },
  userText: {
    color: '#66CCFF',
  },
  kiskaText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 10,
    color: 'rgba(102, 204, 255, 0.5)',
    marginTop: 4,
    marginHorizontal: 4,
  },
});