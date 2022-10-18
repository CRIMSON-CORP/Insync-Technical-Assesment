import { CREATE_TODO, DELETE_TODO, UPDATE_TODO_COMPLETED } from './actionTypes';

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
