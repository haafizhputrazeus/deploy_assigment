import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [captions, setCaptions] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const urlEdit = `https://gallery-app-server.vercel.app/photos/${id}`;

    const editPhoto = (e) => {
        e.preventDefault();
        const editPhotos = async () => {
            setLoading(true);
            try {
                const response = await fetch(urlEdit, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        imageUrl,
                        captions,
                        updatedAt: "12-12-2021",
                    }),
                });
                const data = await response.json();
                setLoading(false);
                navigate("/photos");
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        editPhotos();
    };

    useEffect(() => {
        setLoading(true);
        setLoading(true);
        const fetchPhoto = async () => {
            try {
                const response = await fetch(urlEdit);
                const data = await response.json();
                setImageUrl(data.imageUrl);
                setCaptions(data.captions);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchPhoto();
    }, [id]);

    if (error) return <div>Error!</div>;

    return (
        <>
            {loading ? (
                <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Loading...</h1>
            ) : (
                <div className="container">
                    <form className="edit-form" onSubmit={editPhoto}>
                        <label>
                            Image Url:
                            <input className="edit-input" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </label>
                        <label>
                            Captions:
                            <input className="edit-input" type="text" value={captions} data-testid="captions" onChange={(e) => setCaptions(e.target.value)} />
                        </label>
                        <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
                    </form>
                </div>
            )}
        </>
    );
};

export default EditPhoto;
