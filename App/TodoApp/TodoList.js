import { View, StyleSheet } from 'react-native';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
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
  const simulteneousHandlers = useRef();
  return (
    <View style={styles.wrapper}>
      <Text size={30} weight={200}>
        Todos
      </Text>
      <ScrollView
        style={styles.wrapper}
        ref={simulteneousHandlers}
        showsVerticalScrollIndicator={false}>
        {todos.map((item) => (
          <TodoItem
            {...item}
            key={item.id}
            dispatch={dispatch}
            simulteneousHandlers={simulteneousHandlers}
          />
        ))}
      </ScrollView>
    </View>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      completed: PropTypes.bool,
      title: PropTypes.string,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TodoList;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});
