import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todoActions';

const AddTodo = ({ todos, onAdd }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [active, setActive] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo(text, active))
        // onAdd({text, active});
        setText('');
    }

    return (
        <>
            <form onSubmit = { onSubmit }>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Enter New Todo"
                    onChange = { (e) => setText(e.target.value)}
                    value={text}
                />
            </form>
        </>
    )
}

export default AddTodo
