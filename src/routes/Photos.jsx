import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [sort, setSort] = useState("asc");
    const [submited, setSubmited] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = `https://gallery-app-server.vercel.app/photos`;
    const urlSearch = `https://gallery-app-server.vercel.app/photos${search}`;
    const urlSort = `https://gallery-app-server.vercel.app/photos${sort}`;

    const deletePhoto = (id) => {
        fetch(`https://gallery-app-server.vercel.app/photos${id}`, {
            method: "DELETE",
        }).then(() => {
            setPhotos(photos.filter((photo) => photo.id !== id));
        });
    };

    useEffect(() => {
        setLoading(true);
        const sortFetch = async () => {
            setLoading(true);
            try {
                const response = await fetch(urlSort);
                const data = await response.json();
                setPhotos(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
            if (search) {
                try {
                    const response = await fetch(urlSearch);
                    const data = await response.json();
                    setPhotos(data);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            }
        };
        sortFetch();
    }, [sort, submited]);

    useEffect(() => {
        setLoading(true);
        const fetchPhoto = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                setPhotos(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchPhoto();
    }, []);

    if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Error!</h1>;

    return (
        <>
            <div className="container">
                <div className="options">
                    <select onChange={(e) => setSort(e.target.value)} data-testid="sort" className="form-select" style={{}}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSubmited(search);
                        }}
                    >
                        <input type="text" data-testid="search" onChange={(e) => setSearch(e.target.value)} className="form-input" />
                        <input type="submit" value="Search" data-testid="submit" className="form-btn" />
                    </form>
                </div>
                <div className="content">
                    {loading ? (
                        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Loading...</h1>
                    ) : (
                        photos.map((photo) => {
                            return <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />;
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default Photos;
