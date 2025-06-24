import React, { useState } from 'react';
import {  Link } from 'react-router-dom';

function AlbumItem({ album, handleDelete, updateAlbum }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false); 
    const [newTitle, setNewTitle] = useState(album.title); 
    const [newBody, setNewBody] = useState(album.body); 
    

    const toggleBodyVisibility = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleSaveClick = async (e) => {
        e.stopPropagation();
        const updatedAlbum = { ...album, title: newTitle, body: newBody };
        await updateAlbum(updatedAlbum); // עדכון הכותרת והתוכן
        setIsEditing(false);
    };

    const handleCancelClick = (e) => {
        e.stopPropagation();
        setNewTitle(album.title);
        setNewBody(album.body);
        setIsEditing(false);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        handleDelete(album.id);
    };

    
    return (
        <div className="album-item" onClick={toggleBodyVisibility}>
            <Link to={`${album.id}/photos`} style={{ textDecoration: 'none' }}>
                <span className="album-id">ID: {album.id}</span>
                <br />
                <span className="album-title">{album.title}</span>
            </Link>

            {isExpanded && (
                <p className="album-body">{album.body}</p>
            )}
            {isEditing ? (
                <div onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label>כותרת חדשה:</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>תוכן חדש:</label>
                        <textarea
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSaveClick}>💾 שמור</button>
                    <button onClick={handleCancelClick}>❌ ביטול</button>
                </div>
            ) : (
                <>
                    <button onClick={handleEditClick} className="edit-btn">✏️</button>
                    <button onClick={handleDeleteClick} className="delete-btn">🗑️</button>
                   
                </>
            )}
        </div>
    );
}

export default AlbumItem;
