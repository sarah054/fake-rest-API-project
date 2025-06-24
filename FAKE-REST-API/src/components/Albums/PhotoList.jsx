import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import apiRequest from "../ApiRequest";
import AddPhoto from "./AddPhoto";

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [newPhoto, setNewPhoto] = useState({});

    const { albumId } = useParams();
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/photos";
    const PHOTOS_PER_PAGE = 10; 

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const start = (currentPage - 1) * PHOTOS_PER_PAGE; 
                const response = await fetch(
                    `${API_URL}?albumId=${albumId}&_start=${start}&_limit=${PHOTOS_PER_PAGE}`
                );

                if (!response.ok) throw new Error(response.status);
                const photosList = await response.json();
                // בדיקה אם יש תמונות חדשות להוסיף
                if (photosList.length < PHOTOS_PER_PAGE) {
                    setHasMore(false); // אין עוד תמונות לטעון
                }
                // מניעת כפילויות
                setPhotos((prevPhotos) => [
                    ...prevPhotos,
                    ...photosList.filter(
                        (newPhoto) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
                    ),
                ]);
            } catch (err) {
                setFetchError(err);
            }
        };
        fetchPhotos();
    }, [currentPage, albumId]);

    const loadMorePhotos = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

   //הוספת תמונה
    const addPhoto = async () => {
        const NewPhoto = {
            albumId: albumId,
            title: newPhoto.title,
            url: newPhoto.url,
            thumbnailUrl: newPhoto.thumbnailUrl,
        };
        const photoOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewPhoto),
        };
        const result = await apiRequest(API_URL, photoOptions);
        if (result) setFetchError(result);
        else{
            setPhotos((prevPhotos) => [...prevPhotos, NewPhoto]);
        }
    };

     //מחיקת תמונה
    const handleDeletePhoto = async (photoId) => {
        const listPhoto = photos.filter((photo) => photo.id !== photoId);
        const deleteOptions = { method: "DELETE" };
        const reqUrl = `${API_URL}/${photoId}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
        else{
            setPhotos(listPhoto);
        }
    };
    
    //עדכון תמונה
    const handleUpdatePhoto = async (updatedPhoto) => {
        const updateOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPhoto),
        };
        const reqUrl = `${API_URL}/${updatedPhoto.id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if (result) {
            setFetchError(result);
        } else {
            setPhotos((prevphoto) =>
                prevphoto.map((photo) =>
                    photo.id === updatedPhoto.id ? updatedPhoto : photo
                )
            );
        }
    };

    return (
        <div>
            <h2>תמונות באלבום</h2>
            <button onClick={() => navigate(-1)}>חזור לאלבומים</button>
            {fetchError && <p>{fetchError}</p>}
            <AddPhoto onSubmit={addPhoto} photo={newPhoto} setPhoto={setNewPhoto} />
            <div >
                {photos.map((photo) => (
                    <PhotoItem
                        key={photo.id}
                        photo={photo}
                        deletePhoto={handleDeletePhoto}
                        updatePhoto={handleUpdatePhoto}
                    />
                ))}
            </div>
            {hasMore && (
                <button onClick={loadMorePhotos}>
                    טען עוד
                </button>
            )}
        </div>
    );
};

export default PhotoList;
