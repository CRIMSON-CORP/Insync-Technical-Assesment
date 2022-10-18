import { CREATE_TODO, UPDATE_TODO } from './actionTypes';

/**
 * @param {string} task
 * @returns {{type:string, payload:string}}
 */
export function createTodo(task) {
  return {
    type: CREATE_TODO,
    payload: task,
  };
}

/**
 * @param {string} id
 * @returns {{type:string, payload:string}}
 */
export function updateTodo(id) {
  return {
    type: UPDATE_TODO,
    payload: id,
  };
}
