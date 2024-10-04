import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Solution() {

    const [data, setData] = useState([]);
    const [dataWithImages, setDataWithImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [hoverIndex, setHoverIndex] = useState(null);

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

    const fetchAllData = async (items) => {
        try {
            const promises = items?.map((item) =>
                fetchData(`https://dog.ceo/api/breed/${item}/images/random`)
            );
            const imagesData = await Promise.all(promises);
            return imagesData;
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData('https://dog.ceo/api/breeds/list/all').then((data) => {
            setData(data.message);
            fetchAllData(Object.keys(data?.message)).then((dataArray) => {
                setDataWithImages(dataArray);
                setLoading(false);
            });
        });
    }, []);

    return (
        <>
            {loading && <div id={'js_loading'}>{'Loading'}</div>}
            {!loading && data && dataWithImages && (
                <div style={{ display: 'flex', flexWrap: 'wrap' }} id={'js_gallery'}>
                    {dataWithImages &&
                        Array.isArray(dataWithImages) &&
                        dataWithImages.map((imgObj, index) => (
                            <div
                                style={{ position: 'relative', maxHeight: '200px' }}
                                id={'js_gallery'}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <img
                                    src={imgObj.message}
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
                                        opacity: hoverIndex == index ? 1 : 0,
                                    }}
                                    id={'js_gallery'}
                                >
                                    {Object.keys(data)[index]
                                        ? Object.keys(data)[index]?.charAt(0)?.toUpperCase() +
                                        Object.keys(data)[index]?.slice(1)
                                        : 'Good Dog'}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}
