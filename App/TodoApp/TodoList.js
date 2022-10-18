import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text, TodoItem } from '../../components';

/**
 * @typedef Todo
 * @property {string} id
 * @property {boolean} completed
 * @property {string} title
 */

/**
 * @typedef TodoListProps
 * @property {Todo[]} todos
 * @property {import('react').DispatchWithoutAction} dispatch
 */

/**
 *
 * @param {TodoListProps} TodoListProps
 * @returns {JSX.Element}
 */

function TodoList({ todos, dispatch }) {
  return (
    <View>
      <Text size={30} weight={200}>
        Todos
      </Text>
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => <TodoItem {...item} dispatch={dispatch} />}
      />
    </View>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      completed: PropTypes.bool,
      task: PropTypes.string,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TodoList;
