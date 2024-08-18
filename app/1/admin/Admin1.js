import React, { useEffect, useState } from "react";
import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, Stack, Select, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Login from "./Login";


export default function Admin1() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [paginatedData, setPaginatedData] = useState([]);

    const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
    const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);

    const [statusFilter, setStatusFilter] = useState("");

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setCurrentPaginationPage(1);
        setAllPaginationPageCount(
            filteredData
                && Array.isArray(filteredData)
                && filteredData?.length > 0
                ? Math.ceil(filteredData?.length / 3)
                : 1
        );
        setPaginatedData(
            filteredData
                && Array.isArray(filteredData)
                && filteredData?.length > 0
                ? filteredData?.slice(0, 3)
                : []
        );
    }, [filteredData]);

    const handlePaginationChange = (event, value) => {
        setCurrentPaginationPage(value);
        setPaginatedData(
            filteredData
                && Array.isArray(filteredData)
                && filteredData?.length > 0
                ? filteredData?.slice((value - 1) * 3, value * 3)
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
            setFilteredData(data);
            setLoading(false);
        });
        if(localStorage.getItem("authenticated") === "true") setIsLoggedIn(true);
    }, []);

    function searchData(query) {
        // Convert the search query to lowercase for case-insensitive comparison
        const lowerCaseQuery = query.toLowerCase();

        // Filter the array of objects
        const newFilteredData = data.filter(obj => {
            // Loop through each property in the object
            return Object.values(obj).some(value => {
                // Convert the value to a string and then to lowercase
                return String(value).toLowerCase().includes(lowerCaseQuery);
            });
        });
        setFilteredData(newFilteredData);
    }

    function handleStatusFilter(status) {
        setStatusFilter(status);
        const newData = data.filter(obj => obj.status == status);
        setFilteredData(newData);
    }

    function handleStatusUpdate(id, status) {

        const newData = data.map(obj => {
            // Check if the current object's id matches the provided id
            if (obj.id === id) {
                // If it matches, return a new object with the updated values
                return { ...obj, status: status };
            }
            // If it doesn't match, return the object as is
            return obj;
        });

        setData(newData);
        setFilteredData(newData);

    }


    return (isLoggedIn ? <Grid container sx={{ width: "100%", p: 0, m: 0 }}>
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
                    Array.isArray(paginatedData) &&
                    <>

                        <h1 style={{ fontWeight: "600", fontSize: "20px", paddingBottom: "16px" }}> Leads</h1>

                        {(data?.length > 0) &&
                            <Stack direction={"row"}>
                                <TextField
                                    placeholder="Search"
                                    id="outlined-start-adornment-search"
                                    sx={{ my: 1, width: '25ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>,
                                    }}
                                    onChange={(event) => searchData(event.target.value)}
                                />
                                <FormControl sx={{ width: "200px", m: 1 }}>
                                    <InputLabel id="status-select-label">Status</InputLabel>
                                    <Select
                                        labelId="status-select-label"
                                        id={`status-select-filter`}
                                        value={statusFilter}
                                        label="Status"
                                        onChange={(event) => handleStatusFilter(event.target.value)}
                                    >
                                        <MenuItem value={"PENDING"}>PENDING</MenuItem>
                                        <MenuItem value={"REACHED_OUT"}>REACHED_OUT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                        }
                        {(paginatedData?.length > 0) &&
                            <>

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
                                                    <td>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                id={`status-select-${item.id}`}
                                                                value={item.status}
                                                                onChange={(event) => handleStatusUpdate(item.id, event.target.value)}
                                                            >
                                                                <MenuItem value={"PENDING"}>PENDING</MenuItem>
                                                                <MenuItem value={"REACHED_OUT"}>REACHED_OUT</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </td>
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

                        {(paginatedData?.length < 1) && <h1 style={{ fontWeight: "600", fontSize: "20px", paddingBottom: "16px" }}> No Data</h1>}

                    </>
                }

            </>


        </Grid>
    </Grid> : <Login setIsLoggedIn={() => setIsLoggedIn(true)}/>

    );
}
