import { nanoid } from 'nanoid/non-secure';
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO_COMPLETED } from './actionTypes';

/**
 * @typedef TodoItem
 * @property {string} id
 * @property {boolean} completed
 * @property {string} title
 */

/**
 * @typedef ReducerAction
 * @property {string} type
 * @property {string | null} payload
 */

/**
 *
 * @param {TodoItem[]} state
 * @param {ReducerAction} action
 * @returns {TodoItem[]}
 */

export default function taskReducer(state, action) {
  switch (action.type) {
    case CREATE_TODO: {
      return [
        {
          id: nanoid(5),
          completed: false,
          title: action.payload,
        },
        ...state,
      ];
    }
    case UPDATE_TODO_COMPLETED: {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    }
    case DELETE_TODO: {
      const todoToDeleteIndex = state.findIndex(
        (todo) => todo.id === action.payload
      );
      state.splice(todoToDeleteIndex, 1);
      return [...state];
    }
    default:
      return state;
  }
}
