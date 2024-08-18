import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';


export default function Admin1() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [paginatedData, setPaginatedData] = useState([]);

    const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
    const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);

    useEffect(() => {
        setCurrentPaginationPage(1);
        setAllPaginationPageCount(
            data
                && Array.isArray(data)
                && data?.length > 0
                ? Math.ceil(data?.length / 3)
                : 1
        );
        setPaginatedData(
            data
                && Array.isArray(data)
                && data?.length > 0
                ? data?.slice(0, 3)
                : []
        );
    }, [data]);

    const handlePaginationChange = (event, value) => {
        setCurrentPaginationPage(value);
        setPaginatedData(
            data
                && Array.isArray(data)
                && data?.length > 0
                ? data?.slice((value - 1) * 3, value * 3)
                : []
        );
    };

    const fetchData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData('/api/leads').then((data) => {
            setData(data);
            setLoading(false);
        });
    }, []);

    return (<Grid container sx={{ width: "100%", p: 0, m: 0 }}>
        <Grid item
            xs={2}
            sx={{ height: "100vh", borderRight: "1px solid #e7e7e7", p: 4 }}
        >
            <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>

                <Stack>
                    <h1 style={{ fontWeight: "600", fontSize: "30px", paddingBottom: "16px", textShadow: '#a7a732 2px 2px 25px' }}> Brand</h1>

                    <h1 style={{ fontWeight: "600", fontSize: "20px", paddingTop: "56px" }}> Leads</h1>

                </Stack>
                <Stack direction={"row"}>
                    <Avatar sx={{ bgcolor: "#CCCCCC", color: "#000000" }}>A</Avatar>
                    <h1 style={{ fontWeight: "600", fontSize: "20px", margin: "8px", paddingBottom: "16px" }}> Admin</h1>

                </Stack>

            </Stack>
        </Grid>
        <Grid item
            xs={10}
            sx={{ p: 4 }}
        ><>
                {loading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: "green" }} />
                </Box>
                }
                {!loading && paginatedData &&
                    Array.isArray(paginatedData) && (paginatedData?.length > 0) &&
                    <>
                        <h1 style={{ fontWeight: "600", fontSize: "20px", paddingBottom: "16px" }}> Leads</h1>

                        <table
                            border={11}
                            cellPadding={5}
                            cellSpacing={1}
                            style={{ borderColor: '#fefefe', borderCollapse: "collapse", borderRadius: "25px", width: "90%" }}
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData &&
                                    Array.isArray(paginatedData) &&
                                    paginatedData.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.submitted}</td>
                                            <td>{item.status}</td>
                                            <td>{item.country}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <Stack direction={"row"} justifyContent={"end"} sx={{ my: 2 }}>
                            <Pagination
                                count={allPaginationPageCount}
                                showFirstButton
                                showLastButton
                                sx={{ mx: 7 }}
                                page={currentPaginationPage}
                                onChange={handlePaginationChange}
                            />
                        </Stack>
                    </>
                }

            </>


        </Grid>
    </Grid>

    );
}
