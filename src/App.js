import { useEffect, useState } from "react";
import Header from "./components/Header";
import ShowTodo from "./components/ShowTodo";

function App() {
  const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodo = async () => {
            const getTodosFromServer = await fetchTodos();
            await setTodos(getTodosFromServer);
        }
        getTodo();
    }, []);

    const fetchTodos = async () => {
      const res = await fetch('http://localhost:7000/todos');
      const data = await res.json();
      return data;
    }

    const fetchTodo = async (id) => {
      const res = await fetch(`http://localhost:7000/todos/${id}`);
      const data = res.json();
      return data;
    }

    const addTodo = async(todo) => {
      const res = await fetch('http://localhost:7000/todos', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(todo)
      });

      const data = await res.json();
      console.log(data);
      setTodos([...todos, data]);
    }

    const onChange = async(id) => {
      const gottenTodo = await fetchTodo(id);
      const updatedTodo = await {...gottenTodo, active : !gottenTodo.active}
      const res = await fetch(`http://localhost:7000/todos/${id}`, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(updatedTodo)
      })

      const data = await res.json();
      await setTodos(todos.map((partTodo) => partTodo.id === id ? { ...partTodo, active: data.active } : partTodo));
    }

    const deleteTodo = async (id) => {
      await fetch(`http://localhost:7000/todos/${id}`, {
          method: 'DELETE'
      })
      setTodos(todos.filter( (todo) => todo.id !== id));
    }

  return (
    <div>
      <Header />
      <ShowTodo todos={todos} onFetchTodos={fetchTodos} onAdd={addTodo} onChange={onChange} onDelete={deleteTodo}/>
    </div>
  );
}

export default App;
