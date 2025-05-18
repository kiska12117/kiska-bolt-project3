import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function GlowingOrb() {
  const glowOpacity = useSharedValue(0.6);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    glowScale.value = withRepeat(
      withTiming(1.1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
      transform: [{ scale: glowScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glow, animatedGlowStyle]} />
      <View style={styles.orbContainer}>
        <LottieView
          source={require('../assets/orb.json')}
          autoPlay
          loop
          style={styles.orb}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  orbContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orb: {
    width: 80,
    height: 80,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(102, 204, 255, 0.5)',
    shadowColor: '#66CCFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});