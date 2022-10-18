import {
  APPEND_TO_TODO_LIST,
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
 * @param {string} title
 * @returns {{type:string, payload:string}}
 */
export function createTodo(title) {
  return {
    type: CREATE_TODO,
    payload: title,
  };
}

/**
 * @param {string} id
 * @returns {{type:string, payload:string}}
 */
export function updateTodoCompleted(id) {
  return {
    type: UPDATE_TODO_COMPLETED,
    payload: id,
  };
}

/**
 * @param {string} id
 * @returns {{type:string, payload:string}}
 */
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}

/**
 * @param {string} id
 * @param {string} newTitle
 * @returns {{type:string, payload:{id:string, newTitle:string}}}
 */
export function updateTodoTitle(id, newTitle) {
  return {
    type: UPDATE_TODO_TEXT,
    payload: { id, newTitle },
  };
}

/**
 * @param {TodoItem[]} todos
 * @param {string} newTitle
 * @returns {{type:string, payload:{id:string, payload:TodoItem[]}}}
 */
export function appendTodo(todos) {
  return {
    type: APPEND_TO_TODO_LIST,
    payload: todos,
  };
}
