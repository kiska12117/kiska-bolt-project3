import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const getRandomChar = () => {
  const chars = '01';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const COLUMN_COUNT = 25;
const ROW_COUNT = 15;

export default function MatrixBackground() {
  // Create shared values for Y position of each column
  const positions = Array.from({ length: COLUMN_COUNT }, () =>
    useSharedValue(-Math.random() * height)
  );

  // Animate columns falling down
  useEffect(() => {
    positions.forEach((pos, i) => {
      pos.value = withRepeat(
        withTiming(height, {
          duration: 4000 + Math.random() * 2000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    });
  }, []);

  const renderMatrixColumns = () => {
    return positions.map((pos, i) => {
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: pos.value }],
        };
      });

      return (
        <Animated.View
          key={`column-${i}`}
          style={[
            styles.matrixColumn,
            { left: i * 15 },
            animatedStyle,
          ]}
        >
          {Array.from({ length: ROW_COUNT }).map((_, j) => (
            <Animated.Text
              key={j}
              style={[
                styles.matrixChar,
                { opacity: 1 - j * 0.06 },
              ]}
            >
              {getRandomChar()}
            </Animated.Text>
          ))}
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.matrixContainer}>{renderMatrixColumns()}</View>
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  matrixContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    flexDirection: 'row',
  },
  matrixColumn: {
    position: 'absolute',
    width: 14,
    alignItems: 'center',
  },
  matrixChar: {
    color: '#66CCFF',
    fontSize: 12,
    fontFamily: 'RobotoMono-Regular',
    lineHeight: 14,
    textShadowColor: '#66CCFF',
    textShadowRadius: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
