import React, { useState, useEffect } from 'react';
import apiRequest from '../ApiRequest';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");

    const API_URL = "http://localhost:3000/comments";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${API_URL}?postId=${postId}`);
                if (!response.ok) { throw Error(response.status) }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                setFetchError(error);
            }
        };
        fetchComments();
    }, [postId]);


    if (comments.length === 0) {
        return <p>אין תגובות להצגה.</p>;
    }

    //מחיקת תגובה
    const handleDeleteComment = async (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) { setFetchError(result) }
        else {
            setComments(updatedComments);
        }
    };
    
  
    const handleEditCommentClick = (commentId) => {
        const commentToEdit = comments.find((comment) => comment.id === commentId);
        setNewTitle(commentToEdit.name);
        setNewBody(commentToEdit.body);
        setIsEditing(commentId);
    };

    //שמירת התגובה המעודכנת
    const handleSaveEditedComment = async () => {
        const updatedComment = {
            id: isEditing,
            postId,
            name: newTitle,
            body: newBody,
        };
        const updateOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment),
        };
        const reqUrl = `${API_URL}/${updatedComment.id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setFetchError(result);
        } else {
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === updatedComment.id ? updatedComment : comment
                )
            );
            setIsEditing(false); // סיים עריכה
        }
    };

    const handleCancelEditComment = () => {
        setIsEditing(false); // ביטול עריכה
    };

    return (
        <>
            {fetchError && <p>שגיאה: {fetchError}</p>}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <strong>{comment.name}</strong>
                        <p className="comment-body">{comment.body}</p>
                        {currentUser?.name?.toLowerCase() === comment.name?.toLowerCase() && (
                            <>
                                <button
                                    onClick={() => handleEditCommentClick(comment.id)}
                                    className="edit-btn"
                                >
                                    ✏️
                                </button>
                                {isEditing === comment.id && (
                                    <div className="edit-comment-form">
                                        <div className="edit-comment-input">
                                            <label>תוכן חדש:</label>
                                            <textarea
                                                value={newBody}
                                                onChange={(e) => setNewBody(e.target.value)}
                                            />
                                        </div>
                                        <button onClick={handleSaveEditedComment} className="save-btn">
                                            💾 שמור
                                        </button>
                                        <button onClick={handleCancelEditComment} className="cancel-btn">
                                            ❌ ביטול
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="delete-btn"
                                >
                                    🗑️
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CommentList;
