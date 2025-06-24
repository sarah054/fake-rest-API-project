import React from "react";

const AddPhotoForm = ({ photo, setPhoto, onSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhoto((prevPhoto) => ({
            ...prevPhoto,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(photo);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
            <h3>הוסף תמונה חדשה</h3>
            <label>
                <span>Title:</span>
                <input
                    type="text"
                    name="title"
                    value={photo.title}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                <span>Photo URL:</span>
                <input
                    type="url"
                    name="url"
                    value={photo.url}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                <span>Thumbnail URL:</span>
                <input
                    type="url"
                    name="thumbnailUrl"
                    value={photo.thumbnailUrl}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">
                הוסף תמונה
            </button>
        </form>
    );
};

export default AddPhotoForm;
