import React, { useState } from 'react';
import CommentList from './CommentList';
import apiRequest from '../ApiRequest';


function PostItem({ post, handleDelete, updatePost, currentUserName, currentUserEmail, ShowAllPosts }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(post.title);
    const [newBody, setNewBody] = useState(post.body);
    const [showComments, setShowComments] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [newCommentBody, setNewCommentBody] = useState('');

    const API_URL = "http://localhost:3000/comments";

    const handleTogglePostBody = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleStartEdit = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.stopPropagation();
        const updatedPost = { ...post, title: newTitle, body: newBody };
        await updatePost(updatedPost);
        setIsEditing(false);
    };

    const handleCancelEdit = (e) => {
        e.stopPropagation();
        setNewTitle(post.title);
        setNewBody(post.body);
        setIsEditing(false);
    };

    const handleDeletePost = () => {
        handleDelete(post.id);
    };

    const handleToggleComments = () => {
        setShowComments((prev) => !prev);
    };

    const handleToggleAddComment = (e) => {
        e.stopPropagation();
        setShowAddComment((prev) => !prev);
    };

    const handleSubmitNewComment = async (e) => {
        e.preventDefault();
        const newComment = {
            postId: post.id,
            name: currentUserName,
            body: newCommentBody,
            email: currentUserEmail,
        };
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) {
            setFetchError(result)
        }else{
            setNewCommentBody('');
            setShowAddComment(false); 
        } 
    };

    return (
        <div
            className="post-item"
            onClick={handleTogglePostBody}
        >
            <span className="post-id">ID: {post.id}</span>
            <br />
            <span className="post-title">{post.title}</span>
            {isExpanded && (
                <p className="post-body">
                    {post.body}
                </p>
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
                    <button onClick={handleSaveEdit}>💾 שמור</button>
                    <button onClick={handleCancelEdit}>❌ ביטול</button>
                </div>
            ) : (
                !ShowAllPosts && (
                    <>
                        <button
                            onClick={handleStartEdit}
                            className="edit-btn"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={handleDeletePost}
                            className="delete-btn"
                        >
                            🗑️
                        </button>
                    </>
                )
            )}
            <button onClick={handleToggleComments} className="comments-btn">
                {showComments ? 'סגור תגובות' : 'הצג תגובות'}
            </button>
            {showComments && <CommentList postId={post.id} />}
            <button onClick={handleToggleAddComment} className="add-comment-btn">
                {showAddComment ? 'בטל תגובה' : 'הוסף תגובה'}
            </button>
            {showAddComment && (
                <form onSubmit={handleSubmitNewComment}>
                    <div>
                        <label>תגובה:</label>
                        <textarea
                            value={newCommentBody}
                            onChange={(e) => setNewCommentBody(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">💾 שלח תגובה</button>
                </form>
            )}
        </div>
    );
}

export default PostItem;
