import React from 'react';
import AddTodo from './AddTodo';
import Todos from './Todos';

const Todo = ({ todos, onFetchTodos, onAdd, onChange, onDelete }) => {
    return (
        <>
            <section className="todo-section">
                <h2 className="todo-header">My Todo</h2>
                <AddTodo todos={ todos } onFetchTodos={onFetchTodos} onAdd={onAdd}/>
                <Todos todos={todos} onChange={onChange} onDelete={onDelete}/>
            </section>
        </>
    )
}

export default Todo
