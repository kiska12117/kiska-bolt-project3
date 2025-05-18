import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Speech from 'expo-speech';
import MatrixBackground from '@/components/MatrixBackground';
import GlowingOrb from '@/components/GlowingOrb';
import TimeWeatherDisplay from '@/components/TimeWeatherDisplay';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password.length > 0) {
      onLogin();
    }
  };

  const handleStartAssistant = () => {
    Speech.speak('Welcome back, Commander.', {
      rate: 0.9,
      pitch: 1.1,
      language: 'en-US',
    });
  };

  return (
    <View style={styles.container}>
      <MatrixBackground />
      <TimeWeatherDisplay />

      <View style={styles.contentContainer}>
        <GlowingOrb />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formContainer}
        >
          <BlurView intensity={20} tint="dark" style={styles.formBlur}>
            <Text style={styles.welcomeText}>KISKA</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(102, 204, 255, 0.5)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                onSubmitEditing={handleLogin}
              />
              <View style={styles.inputBorder} />
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, { marginTop: 12, backgroundColor: 'rgba(255, 255, 255, 0.08)' }]} 
              onPress={handleStartAssistant}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>START ASSISTANT</Text>
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>

        <View style={styles.chatContainer}>
          <BlurView intensity={15} tint="dark" style={styles.chatBlur}>
            <Text style={styles.chatPlaceholder}>Chat with KISKA...</Text>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 40,
  },
  formBlur: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
    overflow: 'hidden',
  },
  welcomeText: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: '#66CCFF',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 8,
    textShadowColor: '#66CCFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    fontFamily: 'RobotoMono-Regular',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    paddingHorizontal: 16,
    color: '#66CCFF',
    fontSize: 16,
    zIndex: 1,
  },
  inputBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#66CCFF',
    opacity: 0.5,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#66CCFF22',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#66CCFF',
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
    letterSpacing: 2,
  },
  chatContainer: {
    marginTop: 32,
    width: '100%',
    maxWidth: 400,
  },
  chatBlur: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  chatPlaceholder: {
    color: '#66CCFF',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
    opacity: 0.6,
  },
});
