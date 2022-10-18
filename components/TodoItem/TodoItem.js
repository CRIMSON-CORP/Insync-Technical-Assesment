import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  Layout,
  FadeOut,
  SlideInLeft,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import FetherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteTodo,
  updateTodoCompleted,
  updateTodoTitle,
} from '../../utils/actionCreator';

const AnimatedPressableTodoItem = Animated.createAnimatedComponent(Pressable);
const { width: screenWidth } = Dimensions.get('window');
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

const MIN_SWIPE_VALUE = -120;
const MAX_SWIPE_VALUE = 60;
const EDIT_THRESHOLD = 40;
const DELETE_THRESHOLD = -100;

function TodoItem({ id, completed, title, dispatch, simulteneousHandler }) {
  const animatedStrokeShared = useSharedValue(0);
  const animatedTextShared = useSharedValue(0);
  const todoItemTranslateShared = useSharedValue(0);

  const [editMode, setEditMode] = useState(false);
  const [editTextValue, setEditTextValue] = useState(title);

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

  const updateEditTextValue = useCallback(
    (newTextValue) => {
      setEditTextValue(newTextValue);
    },
    [editTextValue]
  );

  const deleteTodoItem = useCallback(() => {
    dispatch(deleteTodo(id));
  }, [id]);

  const updateTodoItemTitle = useCallback(() => {
    dispatch(updateTodoTitle(id, editTextValue));
    setEditMode(false);
  }, [editTextValue]);

  const gesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.start = todoItemTranslateShared.value;
    },
    onActive: (e, ctx) => {
      if (
        e.translationX < MAX_SWIPE_VALUE &&
        e.translationX > MIN_SWIPE_VALUE
      ) {
        todoItemTranslateShared.value = e.translationX + ctx.start;
      }
    },
    onFinish: (e) => {
      if (e.translationX > EDIT_THRESHOLD) {
        todoItemTranslateShared.value = withTiming(0, undefined, () =>
          runOnJS(setEditMode)(true)
        );
      } else if (e.translationX < DELETE_THRESHOLD) {
        todoItemTranslateShared.value = withTiming(-screenWidth, {}, () =>
          runOnJS(deleteTodoItem)()
        );
      } else {
        todoItemTranslateShared.value = withSpring(0);
      }
    },
  });

  const animatedPressableStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: todoItemTranslateShared.value }],
  }));

  return (
    <Animated.View
      style={styles.wrapper}
      entering={SlideInLeft}
      exiting={FadeOut}
      layout={Layout.springify()}>
      <View style={styles.backView}>
        <FetherIcon name="edit-3" color="#039BE5" size={20} />
        <MaterialCommunityIcons
          name="delete-outline"
          color="#E53935"
          size={20}
        />
      </View>
      <PanGestureHandler
        simultaneousHandlers={simulteneousHandler}
        onGestureEvent={gesture}>
        <AnimatedPressableTodoItem
          onPress={updateCompleted}
          style={[styles.todoItem, animatedPressableStyles]}>
          {editMode ? (
            <TextInput
              autoFocus
              style={styles.text}
              value={editTextValue}
              onChangeText={updateEditTextValue}
              onBlur={updateTodoItemTitle}
              onSubmitEditing={updateTodoItemTitle}
            />
          ) : (
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
          )}
        </AnimatedPressableTodoItem>
      </PanGestureHandler>
    </Animated.View>
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
    position: 'relative',
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
  backView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
