import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../actions/todoActions";
import Todo from "./Todo";

const ShowTodo = ({ onFetchTodos, onAdd, onChange, onDelete }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [active, setActive] = useState(true);
  const [inputActive, setInputActive] = useState(false);
  const todoItems = useSelector((state) => state.todoItems);
  const { error, todos, loading } = todoItems;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(text, active));
    setText("");
  };
  const inputHandler = () => {
    //Handle Input
    if (!inputActive) {
      setInputActive(true);
    } else {
      setInputActive(false);
    }
  };

  return (
    <>
      <section className="todo-section">
        <div className="todo-head">
          <h2 className="todo-header">My Todo</h2>
          {inputActive ? (
            <span onClick={inputHandler}>x</span>
          ) : (
            <span onClick={inputHandler}>+</span>
          )}
        </div>
        {inputActive ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="todo-input"
              placeholder="Enter New Todo"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
        ) : (
          " "
        )}
        {error && <div>{error}</div>}
        {todos && (
          <div className="todo-div">
            {loading && <div>Todo is Loading</div>}
            <ul className="todo-ul">
              {todos.map((todo) => (
                <li key={todo._id}>
                  <Todo todo={todo} onChange={onChange} onDelete={onDelete} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default ShowTodo;
