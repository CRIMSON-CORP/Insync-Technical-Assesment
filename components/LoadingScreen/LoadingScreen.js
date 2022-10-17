import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

function LoadingScreen() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 1000 }), Infinity);
  }, []);

  const rotateAnimatedstyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.circle, rotateAnimatedstyles]}>
        <View style={styles.dot} />
      </Animated.View>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderWidth: 5,
    borderColor: '#FF00FF',
    borderRadius: 999999,
    padding: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999999,
    backgroundColor: '#FF00FF',
  },
});
