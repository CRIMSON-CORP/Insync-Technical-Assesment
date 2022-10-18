import { useReducer } from 'react';
import { View } from 'react-native';
import taskReducer from '../../utils/taskReducer';
import Form from './Form';
import TodoList from './TodoList';

function TodoApp() {
  const [todos, dispatch] = useReducer(taskReducer, []);

  return (
    <View>
      <Form dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
    </View>
  );
}

export default TodoApp;
