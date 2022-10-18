import { nanoid } from 'nanoid/non-secure';
import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO_COMPLETED,
  UPDATE_TODO_TEXT,
} from './actionTypes';

/**
 * @typedef TodoItem
 * @property {string} id
 * @property {boolean} completed
 * @property {string} title
 */

/**
 * @typedef ReducerAction
 * @property {string} type
 * @property {string | null | {id:string, newTitle:string}} payload
 */

/**
 *
 * @param {TodoItem[]} state
 * @param {ReducerAction} action
 * @returns {TodoItem[]}
 */

export default function todoReducer(state, action) {
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
      // I would consider using this for secnarios
      // where this is a large amount of list items
      //
      // const todoToDeleteIndex = state.findIndex(
      //   (todo) => todo.id === action.payload
      // );
      // state.splice(todoToDeleteIndex, 1);
      // return [...state];

      return state.filter((todos) => todos.id !== action.payload);
    }
    case UPDATE_TODO_TEXT: {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.newTitle;
        }
        return todo;
      });
    }
    default:
      return state;
  }
}
