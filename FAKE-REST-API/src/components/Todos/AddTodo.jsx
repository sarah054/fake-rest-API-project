import { useRef } from 'react';

const AddTodo = ({ newTodo, setNewTodo, handleSubmit }) => {

    const inputRef = useRef();

    function onhandleSubmit(e)
    {
        e.preventDefault();
       handleSubmit(newTodo);
    }
    return (
        <form className='addForm' onSubmit={onhandleSubmit}>
            <label htmlFor='addTodo'>הוספת משימה:</label>
            <input
                autoFocus
                ref={inputRef}
                id='addTodo'
                type='text'
                required
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Todo'
                onClick={() => inputRef.current.focus()}
            >
             הוספה
            </button>
        </form>
    )
}

export default AddTodo