import {
  ADD_TODO_FAIL,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_ITEM,
  GET_TODO_FAIL,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  UPDATE_ITEM_SUCCESS,
} from "../constants/todoConstants";

export const todoReducer = (state = { loading: true, todos: [] }, action) => {
  switch (action.type) {
    case GET_TODO_REQUEST:
      return { loading: true };
    case GET_TODO_SUCCESS:
      return { loading: false, todos: action.payload };
    case GET_TODO_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      const items = action.payload;
      return {
        loading: false,
        todos: items,
      };
    case ADD_TODO_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ITEM_SUCCESS:
      return { loading: false, todos: action.payload };
      case DELETE_TODO_ITEM:
        return { loading: false, todos: action.payload};
    default:
      return state;
  }
};

