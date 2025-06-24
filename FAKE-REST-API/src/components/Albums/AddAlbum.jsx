import { useRef } from 'react';

const AddAlbum = ({ newAlbum, setNewAlbum, handleSubmit }) => {
    const inputRef = useRef();

    function handleSubmit2(e) {
        e.preventDefault();
        handleSubmit(newAlbum); // שולח את האובייקט כולו
    }

    // פונקציה לעדכון שדה מסוים באלבום
    const handleInputChange = (field, value) => {
        setNewAlbum((prevAlbum) => ({
            ...prevAlbum,
            [field]: value, // מעדכן את השדה הספציפי (title או description)
        }));
    };

    return (
        <form className='addForm' onSubmit={handleSubmit2}>
            <label htmlFor='addTitle'>כותרת:</label>
            <input
                autoFocus
                ref={inputRef}
                id='addTitle'
                type='text'
                placeholder='הכנס כותרת לאלבום'
                required
                value={newAlbum.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
            />
            
            <button
                type='submit'
                aria-label='Add Album'
                onClick={() => inputRef.current.focus()}
            >
                הוספה
            </button>
        </form>
    );
};

export default AddAlbum;
