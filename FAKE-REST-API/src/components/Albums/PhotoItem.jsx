import React, { useState } from "react";

const PhotoItem = ({ deletePhoto, updatePhoto, photo }) => {
    const [isEditing, setIsEditing] = useState(false); // מצב עריכה
    const [newTitle, setNewTitle] = useState(photo.title); // כותרת חדשה
    const [newUrl, setNewUrl] = useState(photo.url); // קישור חדש

    // הפעלת מצב עריכה
    const onEditClick = () => {
        setIsEditing(true);
    };

    const onDeleteClick = () => {
        deletePhoto(photo.id);
    };

    // שמירה של העדכון
    const onSaveClick = () => {
        const updatedPhoto = { ...photo, title: newTitle, url: newUrl };
        updatePhoto(updatedPhoto);
        setIsEditing(false);
    };

    // ביטול העריכה
    const onCancelClick = () => {
        setNewTitle(photo.title);
        setNewUrl(photo.url);
        setIsEditing(false);
    };

    return (
        <div
        >
            <img
                src={photo.url}
                alt={photo.id}

            />
            {isEditing ? (
                <div>
                    <div >
                        <label>כותרת חדשה:</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}

                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <label>קישור חדש:</label>
                        <input
                            type="text"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}

                        />
                    </div>
                    <button
                        onClick={onSaveClick}

                    >
                        💾 שמור
                    </button>
                    <button
                        onClick={onCancelClick}

                    >
                        ❌ ביטול
                    </button>
                </div>
            ) : (
                <div>
                    <p>{photo.title || `תמונה ${photo.id}`}</p>
                    <button
                        onClick={onDeleteClick}
                    >
                        🗑️ מחק תמונה
                    </button>
                    <button
                        onClick={onEditClick}

                    >
                        ✏️ עדכן תמונה
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoItem;

