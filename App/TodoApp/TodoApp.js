import { useEffect, useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import { appendTodo } from '../../utils/actionCreator';
import todoReducer from '../../utils/todoReducer';
import Form from './Form';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5',
        {
          signal: controller.signal,
        }
      );
      const data = await response.json();
      if (isMounted) {
        dispatch(appendTodo(data));
      }
    })();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
