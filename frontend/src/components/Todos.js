import React from "react";
import Todo from "./Todo";

const Todos = ({ todos, onChange, onDelete }) => {
  return (
    <div className="todo-div">
      <ul className="todo-ul">
        {todos.map((todo) => (
          <li key={todo._id}>
            <Todo todo={todo} onChange={onChange} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
