import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { updateTodoCompleted } from '../../utils/actionCreator';

const AnimatedPressableTodoItem = Animated.createAnimatedComponent(Pressable);

/**
 * @typedef TodoItemProps
 * @property {string} id
 * @property {boolean} completed
 * @property {string} title
 * @property {import('react').DispatchWithoutAction} dispatch
 */

/**
 * @param {TodoItemProps} TodoItemProps
 * @returns {JSX.Element}
 */
function TodoItem({ id, completed, title, dispatch }) {
  const animatedStrokeShared = useSharedValue(0);
  const animatedTextShared = useSharedValue(0);

  useEffect(() => {
    if (completed) {
      animatedStrokeShared.value = withTiming(100);
      animatedTextShared.value = withTiming(1);
    } else {
      animatedStrokeShared.value = withTiming(0);
      animatedTextShared.value = withTiming(0);
    }
  }, [completed]);

  const animatedStrokeStyle = useAnimatedStyle(() => ({
    width: `${animatedStrokeShared.value}%`,
  }));
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animatedTextShared.value, [0, 1], ['#FFF', '#999']),
  }));

  const updateCompleted = useCallback(
    () => dispatch(updateTodoCompleted(id)),
    []
  );

  return (
    <View style={styles.wrapper}>
        <AnimatedPressableTodoItem
          onPress={updateCompleted}
          style={[styles.todoItem, animatedPressableStyles]}>
            <View style={styles.textWrapper}>
              <View style={styles.strokeRelative}>
                <Animated.Text style={[styles.text, animatedTextStyle]}>
                  {title}
                </Animated.Text>
                <Animated.View
                  style={[styles.completedStroke, animatedStrokeStyle]}
                />
              </View>
            </View>
        </AnimatedPressableTodoItem>
    </View>
  );
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TodoItem;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  todoItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#391D56',
    elevation: 7,
  },
  textWrapper: {
    alignSelf: 'flex-start',
  },
  strokeRelative: {
    position: 'relative',
  },
  text: {
    color: '#FFF',
    alignSelf: 'flex-start',
    fontFamily: 'poppins-regular',
    fontSize: 20,
    fontWeight: '400',
  },
  completedStroke: {
    height: 2,
    backgroundColor: '#999',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -1 }],
  },
});
