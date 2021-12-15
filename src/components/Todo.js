import { FaTimes } from 'react-icons/fa';

const Todo = ({todo, onChange, onDelete}) => {
    return (
        <>
            <p
                className= { todo.active ? "" : "strike-through" }
                onClick={ () => onChange(todo.id)}
                >{todo.text}
            </p>
            <span onClick={() => onDelete(todo.id)}><FaTimes /></span>
        </>
    )
}

export default Todo
