import Axios from "axios";
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

export const addTodo = (text, active) => async (dispatch, getState) => {
  dispatch({ type: ADD_TODO_REQUEST });
  try {
    const { data } = await Axios.post("/api/todos/new", { text, active });
    const allTodos = JSON.parse(localStorage.getItem("todoItems"));
    const newTodos = [...allTodos, data];
    dispatch({ type: ADD_TODO_SUCCESS, payload: newTodos });
    localStorage.setItem(
      "todoItems",
      JSON.stringify(getState().todoItems.todos)
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADD_TODO_FAIL, payload: message });
  }
};

export const getTodos = () => async (dispatch, getState) => {
  dispatch({ type: GET_TODO_REQUEST });
  try {
    const { data } = await Axios.get("/api/todos");
    dispatch({ type: GET_TODO_SUCCESS, payload: data });
    localStorage.setItem("todoItems", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GET_TODO_FAIL, payload: message });
  }
};

export const updateTodo = (todoId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/todos/update/${todoId}`);
  const allTodos = JSON.parse(localStorage.getItem("todoItems"));
  const updateTodos = allTodos.map((todo) => {
    const findTodo = todo._id === data._id ? data : todo;
    return findTodo;
  });
  dispatch({ type: UPDATE_ITEM_SUCCESS, payload: updateTodos });
  localStorage.setItem("todoItems", JSON.stringify(getState().todoItems.todos));
};

export const deleteTodo = (todoId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/todos/delete/${todoId}`);
  const allTodos = JSON.parse(localStorage.getItem("todoItems"));
  if (data.message === "success") {
    const updateTodo = allTodos.filter((todo) => todo._id !== todoId);
    dispatch({ type: DELETE_TODO_ITEM, payload: updateTodo });
  }
  localStorage.setItem("todoItems", JSON.stringify(getState().todoItems.todos));
};
