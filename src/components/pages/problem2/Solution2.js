import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Solution2() {

    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similar, setSimilar] = useState(null);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };


    // debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData('https://api.sampleapis.com/coffee/hot')
                .then(result => setData(result && Array.isArray(result) && result.filter((item) => item?.title?.toLowerCase().includes(searchTerm?.toLowerCase()))))
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);


    const handleSearch = (e) => {
        setLoading(true);
        setSimilar(null);
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleSuggestionClick = () => {
        fetchData('https://api.sampleapis.com/coffee/iced')
            .then(result => setSimilar(result && Array.isArray(result) ? result : []))
    }

    return (
        <Box>
            <div style={{ marginBottom: "5px" }}>Search Coffee Type (Ex: latte)</div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    width: "100%",
                    border: "1px solid #d1d1d1",
                    padding: "8px"
                }}
            />
            {loading &&
                <div style={{ margin: "5px 0" }}>Loading Suggestions...</div>
            }
            {
                !loading && !similar && data && Array.isArray(data) && data.map((item) => (
                    <div
                        key={item?.title}
                        style={{
                            marginTop: "3px",
                            marginBottom: "3px",
                            padding: "4px",
                            background: "#f4f4f4",
                            cursor: "pointer",
                        }}
                        onClick={handleSuggestionClick}
                    >{item?.title}</div>
                ))
            }
            {similar && Array.isArray(similar) &&
                <>
                    <div style={{ margin: "5px 0" }}>Similar Iced Coffee:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: "3px", marginBottom: "3px", }}>
                        {

                            similar.map((item, index) => (
                                <div
                                    style={{ position: 'relative', maxHeight: '200px' }}
                                    id={'js_gallery'}
                                    key={`js_gallery${index}`}
                                >
                                    <img
                                        src={item.image}
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                        className={'js_image'}
                                    />
                                    <div
                                        className={'js_name'}
                                        style={{
                                            position: 'absolute',
                                            left: '10px',
                                            bottom: '10px',
                                            zIndex: 400,
                                            color: 'white',
                                            textShadow: '2px 2px 5px black',
                                            opacity: 1,
                                        }}
                                        id={'js_gallery'}
                                    >
                                        {item.title
                                            ? item.title
                                            : 'Iced Coffee'}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </Box>
    );
}
