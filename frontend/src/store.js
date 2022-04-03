import { combineReducers, compose, createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { todoReducer } from "./reducers/todoReducers";

const initialState = {
  todoItems: {
    todos: localStorage.getItem("todoItems")
      ? JSON.parse(localStorage.getItem("todoItems"))
      : [],
  },
};
const reducer = combineReducers({
  todoItems: todoReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
