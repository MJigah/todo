import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "./actions/todoActions";
import Header from "./components/Header";
import ShowTodo from "./components/ShowTodo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const todoItems = useSelector((state) => state.todoItems);
  const { loading, todos, error } = todoItems;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const fetchTodos = async () => {
    dispatch(getTodos());
    // const res = await fetch('http://localhost:7000/todos');
    // const data = await res.json();
    // return data;
  };

  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:7000/todos/${id}`);
    const data = res.json();
    return data;
  };

  const addTodo = async (todo) => {
    const res = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const data = await res.json();
    console.log(data);
    setTodoList([...todoList, data]);
  };

  const onChange = async (id) => {
    const gottenTodo = await fetchTodo(id);
    const updatedTodo = await { ...gottenTodo, active: !gottenTodo.active };
    const res = await fetch(`http://localhost:7000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();
    await setTodoList(
      todoList.map((partTodo) =>
        partTodo.id === id ? { ...partTodo, active: data.active } : partTodo
      )
    );
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:7000/todos/${id}`, {
      method: "DELETE",
    });
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Header />
      {loading && <div>Todo is Loading</div>}
      {error && <div>{error}</div>}
      {todos && (
        <ShowTodo
          todos={todos}
          onFetchTodos={fetchTodos}
          onAdd={addTodo}
          onChange={onChange}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
