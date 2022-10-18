import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import { Text } from '../../components';
import { createTodo } from '../../utils/actionCreator';

const AnimatedPresssbale = Animated.createAnimatedComponent(Pressable);

function Form({ dispatch }) {
  const backgroundShared = useSharedValue(0);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (textValue) {
      backgroundShared.value = withTiming(1);
    } else {
      backgroundShared.value = withTiming(0);
    }
  }, [textValue]);

  useEffect(
    () => () => {
      setTextValue('');
      backgroundShared.value = 0;
    },
    []
  );

  const pressableAnimatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundShared.value,
      [0, 1],
      ['#888888', '#FF00FF']
    ),
  }));

  const updateTextValue = useCallback(
    (newTextValue) => {
      setTextValue(newTextValue);
    },
    [textValue]
  );

  const onSubmit = useCallback(() => {
    if (!textValue) return Alert.alert('Please write a task!');
    dispatch(createTodo(textValue));
    return setTextValue('');
  }, [textValue]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={textValue}
        style={styles.textInput}
        selectionColor="#FF00FF"
        onChangeText={updateTextValue}
      />
      <AnimatedPresssbale
        onPress={onSubmit}
        style={[styles.pressable, pressableAnimatedBackgroundStyle]}>
        <Text style={styles.pressableText} weight={600}>
          Add Task
        </Text>
      </AnimatedPresssbale>
    </View>
  );
}

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Form;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textInput: {
    flexGrow: 1,
    color: '#FFF',
    marginRight: 20,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#391D56',
    fontFamily: 'poppins-regular',
  },
  pressable: {
    elevation: 6,
    color: '#FFF',
    borderRadius: 6,
    paddingVertical: 8,
    backgroundColor: '#FF00FF',
    paddingHorizontal: 10,
  },
  pressableText: {
    color: '#FFF',
  },
});
