import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../actions/todoActions";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const onChange = (todoId) => {
    dispatch(updateTodo(todoId));
  };
  const onDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  }
  return (
    <>
      <p
        className={todo.active ? "" : "strike-through"}
        onClick={() => onChange(todo._id)}
      >
        {todo.text}
      </p>
      <span onClick={() => onDelete(todo._id)}>
        <FaTimes />
      </span>
    </>
  );
};

export default Todo;
