import { useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import todoReducer from '../../utils/todoReducer';
import Form from './Form';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <View style={styles.wrapper}>
      <Form dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
    </View>
  );
}

export default TodoApp;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
