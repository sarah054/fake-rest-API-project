import React, { useState, useEffect } from "react";
import PostItem from './PostItem';
import AddPost from './AddPost';
import SearchPost from './SearchPost';
import apiRequest from "../ApiRequest"

function PostList() {
    const API_URL = "http://localhost:3000/posts";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [userPosts, setUserPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(userPosts); // רשימה מסוננת
    const [fetchError, setfetchError] = useState(null);
    const [searchValue, setSearchValue] = useState(""); // הערך לחיפוש
    const [searchCriterion, setSearchCriterion] = useState("default");
    const [newPost, setNewPost] = useState('');
    const [showPostsbtn, setShowPostsbtn] = useState("הצג את כל הפוסטים");
    const [showAllPosts, setShowAllPosts] = useState(false);

    //טעינת פוסטים של משתמש מסוים
    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error(response.status);
                const listPost = await response.json();
                setAllPosts(listPost)
                const userListPosts = listPost.filter(post => post.userId === Number(currentUser.id));
                setUserPosts(userListPosts);
            } catch (err) {
                setfetchError(err);
            }
        };
        fetchItems();
    }, []);

    //חיפוש פוסט לפי קרטריון
    useEffect(() => {
        const filtered = userPosts.filter((post) => {
            if (searchCriterion === "default") {
                return userPosts;
            }
            else if (searchCriterion === "id") {
                return post.id.toString().includes(searchValue); // חיפוש לפי ID
            } else if (searchCriterion === "title") {
                return post.title.toLowerCase().includes(searchValue.toLowerCase()); // חיפוש לפי כותרת
            }
            return false;
        });
        setFilteredPosts(filtered);
    }, [searchValue, searchCriterion, userPosts]);



    //הוספת פוסט
    const addPost = async () => {
        const userId = currentUser.id;
        const NewPost = {
            userId: userId,
            title: newPost.title,
            body: newPost.body
        };
        const listPosts = [...userPosts, NewPost];
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NewPost)
        }
        const result = await apiRequest(API_URL, postOptions);
        if (result) {
            setfetchError(result);
        }
        else {
            setUserPosts(listPosts);
        }
    }

    //מחיקת פוסט
    const handleDelete = async (id) => {
        const listPosts = userPosts.filter((item) => item.id !== id);
        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) {
            setfetchError(result);
        }
        else {
            setUserPosts(listPosts);
        }
    }

    //עדכון פוסט
    const updatePost = async (updatedPost) => {
        const updateOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost), // שליחה של כל אובייקט הפוסט
        };
        const reqUrl = `${API_URL}/${updatedPost.id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setfetchError(result);
        } else {
            setUserPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );
        }

    };


    const handleShowAllPosts = () => {
        if (!showAllPosts) {
            // הצגת כל הפוסטים
            setFilteredPosts(allPosts);
            setShowPostsbtn("הצג פוסטים שלי");
        } else {
            // חזרה להצגת הפוסטים של המשתמש
            setFilteredPosts(userPosts);
            setShowPostsbtn("הצג את כל הפוסטים");
        }
        setShowAllPosts(!showAllPosts);
    };

    return (
        <>
            {fetchError && <p>שגיאה: {fetchError}</p>}
            <button onClick={handleShowAllPosts}>{showPostsbtn}</button>
            <AddPost newPost={newPost} setNewPost={setNewPost} handleSubmit={addPost}></AddPost>
            <SearchPost searchValue={searchValue} setSearchValue={setSearchValue}
                setSearchCriterion={setSearchCriterion} searchCriterion={searchCriterion}></SearchPost>
            <ul>
                {filteredPosts.map(post => (
                    <PostItem ShowAllPosts={showAllPosts} key={post.id} post={post}
                        handleDelete={handleDelete} updatePost={updatePost}
                        currentUserName={currentUser.name} currentUserEmail={currentUser.email} />

                ))}

            </ul>
        </>
    );
}

export default PostList;
