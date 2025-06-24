import React, { useState, useEffect } from "react";
import AlbumItem from "./AlbumItem";
import AddAlbum from "./AddAlbum";
import SearchAlbum from "./SearchAlbum";
import apiRequest from "../ApiRequest";
import { useParams, Outlet } from "react-router-dom";

function AlbumList() {
    const API_URL = "http://localhost:3000/albums";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState(albums); // רשימה מסוננת
    const [fetchError, setFetchError] = useState(null);
    const [searchValue, setSearchValue] = useState(""); // הערך לחיפוש
    const [searchCriterion, setSearchCriterion] = useState("default");
    const [newAlbum, setNewAlbum] = useState({});

    const { albumId } = useParams(); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_URL}?userId=${currentUser.id}`);
                if (!response.ok) throw Error("Did not receive expected data");
                const albumList = await response.json();
                setAlbums(albumList);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        const filtered = albums.filter((album) => {
            if (searchCriterion === "default") {
                return albums;
            } else if (searchCriterion === "id") {
                return album.id.toString().includes(searchValue); // חיפוש לפי ID
            } else if (searchCriterion === "title") {
                return album.title.toLowerCase().includes(searchValue.toLowerCase()); // חיפוש לפי כותרת
            }
            return false;
        });
        setFilteredAlbums(filtered);
    }, [searchValue, searchCriterion, albums]);

    // הוספת אלבום
    const addAlbum = async () => {
        const userId = currentUser.id;
        const NewAlbum = {
            userId: userId,
            title: newAlbum.title,
            description: newAlbum.description, // הוספת תיאור לאלבום
        };
        const listAlbums = [...albums, NewAlbum];
        setAlbums(listAlbums);
        const albumOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewAlbum),
        };
        const result = await apiRequest(API_URL, albumOptions);
        if (result) setFetchError(result);
    };

    // מחיקת אלבום
    const handleDelete = async (id) => {
        const listAlbums = albums.filter((item) => item.id !== id);
        setAlbums(listAlbums);

        const deleteOptions = { method: "DELETE" };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    };

    // עדכון אלבום
    const updateAlbum = async (updatedAlbum) => {
        const updateOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAlbum), // שליחה של כל אובייקט האלבום
        };

        const reqUrl = `${API_URL}/${updatedAlbum.id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setFetchError(result);
        } else {
            setAlbums((prevAlbums) =>
                prevAlbums.map((album) =>
                    album.id === updatedAlbum.id ? updatedAlbum : album
                )
            );
        }
    };

    return (
        <>
            {albumId ? (
                <Outlet />
            ) : (
                <>
                    {fetchError && <p>שגיאה: {fetchError}</p>}
                    <AddAlbum newAlbum={newAlbum} setNewAlbum={setNewAlbum} handleSubmit={addAlbum} />
                    <SearchAlbum
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        setSearchCriterion={setSearchCriterion}
                        searchCriterion={searchCriterion}
                    />
                    <ul>
                        {filteredAlbums.map((album) => (
                            <AlbumItem
                                key={album.id}
                                album={album}
                                handleDelete={handleDelete}
                                updateAlbum={updateAlbum}
                                currentUserName={currentUser.name}
                                currentUserEmail={currentUser.email}
                            />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default AlbumList;
