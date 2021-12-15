import React, { useState } from 'react'

const AddTodo = ({ todos, onAdd }) => {

    const [text, setText] = useState('');
    const [active, setActive] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();
        onAdd({text, active});
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
