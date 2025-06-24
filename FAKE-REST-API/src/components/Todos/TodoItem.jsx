import React, { useState } from 'react';

function TodoItem({ todo, handleDelete, handleCheck, updateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    // פונקציה למחיקת משימה
    const onChangeDelete = () => {
        handleDelete(todo.id);
    };

    // פונקציה לשינוי מצב ה-checkbox
    const onChangeCheckbox = () => {
        handleCheck(todo.id);
    };

    // פונקציה להפעלת מצב עריכה
    const onChangeEditMode = () => {
        setIsEditing(true);
    };

    // פונקציה לסיום העריכה ועדכון ה-`title`
    const onChangeSave = async () => {
        const newTodo = { ...todo, title: newTitle };
        await updateTodo(newTodo); // עדכון ה-`title` בשרת
        setIsEditing(false);
    };

    // פונקציה לביטול העריכה
    const onChangeCancel = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
        <span className="todo-id">ID: {todo.id}</span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onChangeCheckbox}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)} // עדכון השם החדש
            />
            <button onClick={onChangeSave}>💾 שמור</button>
            <button onClick={onChangeCancel}>❌ ביטול</button>
          </>
        ) : (
          <>
            <span>{todo.title}</span>
            <div className="button-container">
              <button onClick={onChangeEditMode} className="edit-btn">
                ✏️
              </button>
              <button onClick={onChangeDelete} className="delete-btn">
                🗑️
              </button>
            </div>
          </>
        )}
      </div>
    );
}

export default TodoItem;
