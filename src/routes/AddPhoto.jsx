import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [captions, setCaptions] = useState("");
    const [secret, setSecret] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const url = `https://gallery-app-server.vercel.app/photos`;

    const addPhoto = (e) => {
        e.preventDefault();
        const newPhoto = async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl,
                    captions,
                    createdAt: "12/05/2022",
                    updatedAt: "12/05/2022",
                    secret: secret,
                }),
            });
            const data = await response.json();
            if (data) {
                navigate("/photos");
            } else {
                setError(error.message);
            }
        };
        newPhoto();
    };

    return (
        <>
            <div className="container">
                {error && <div className="error-msg">{error}</div>}
                <form className="add-form" onSubmit={addPhoto}>
                    <label>
                        Image Url:
                        <input className="add-input" type="text" data-testid="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </label>
                    <label>
                        Captions:
                        <input className="add-input" type="text" data-testid="captions" value={captions} onChange={(e) => setCaptions(e.target.value)} />
                    </label>
                    <label>
                        Secret:
                        <input className="add-input" type="text" value={secret} data-testid="secret" onChange={(e) => setSecret(e.target.value)} />
                    </label>
                    <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
                </form>
            </div>
        </>
    );
};

export default AddPhoto;
