import { useRef } from 'react';

const AddPost = ({ newPost, setNewPost, handleSubmit }) => {
    const inputRef = useRef();

    function onHandleSubmit(e) {
        e.preventDefault();
        handleSubmit(); 
    }

    // פונקציה לעדכון שדה מסוים בפוסט
    const handleInputChange = (field, value) => {
        setNewPost((prevPost) => ({
            ...prevPost,
            [field]: value, 
        }));
    };

    return (
        <form className='addForm' onSubmit={onHandleSubmit}>
            <label htmlFor='addTitle'>כותרת:</label>
            <input
                autoFocus
                ref={inputRef}
                id='addTitle'
                type='text'
                placeholder='הכנס כותרת'
                required
                value={newPost.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <label htmlFor='addBody'>גוף הפוסט:</label>
            <textarea
                id='addBody'
                placeholder='הכנס את תוכן הפוסט'
                required
                value={newPost.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Post'
                onClick={() => inputRef.current.focus()}
            >
                הוספה
            </button>
        </form>
    );
};

export default AddPost;
