import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <HomeScreen onLogout={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});