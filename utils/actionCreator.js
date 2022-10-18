import { CREATE_TODO, UPDATE_TODO_COMPLETED } from './actionTypes';

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
export function updateTodoCompleted(id) {
  return {
    type: UPDATE_TODO_COMPLETED,
    payload: id,
  };
}
