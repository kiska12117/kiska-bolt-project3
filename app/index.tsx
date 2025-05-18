import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import LoginScreen from '@/screens/LoginScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'RobotoMono-Regular': require('@/assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-Bold': require('@/assets/fonts/RobotoMono-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LoginScreen onLogin={() => router.push('/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});