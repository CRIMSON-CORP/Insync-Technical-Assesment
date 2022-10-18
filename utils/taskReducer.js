import { nanoid } from 'nanoid/non-secure';
import { CREATE_TODO } from './actionTypes';

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
    default:
      return state;
  }
}
