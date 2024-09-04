import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useRouter } from 'next/navigation';

import ProfileSection from "../ProfileSection";
import { ProfileStyles } from "../ProfileStyles";


export default function Login({ setIsLoggedIn }) {

    const router = useRouter();

    const [loginData, setLoginData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);

    const fetchData = async (url) => {
        try {
            setIsLoading(true);
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
        fetchData('/api/auth').then((data) => {
            setLoginData(data);
            setIsLoading(false);
        });
    }, []);

    const handleLogin = () => {
        // Mock login action
        if (loginData?.username == username && loginData?.password == password) {
            localStorage.setItem('authenticated', 'true');
            setIsLoggedIn();
        } else { setLoginFailed(true)}
    };


    return (<Stack>
        <ProfileSection
            title={"Username"}
            handleChange={(event) => setUsername(event.target.value)}
            value={username}
            multiline={false}
        />
        <ProfileSection
            title={"Password"}
            handleChange={(event) => setPassword(event.target.value)}
            value={password}
            multiline={false}
            type={"password"}
        />
        <Stack sx={{ ...ProfileStyles.profileSectionStyles, mb: 4 }}>
            <Button
                variant="contained"
                sx={{ background: "#000000", height: "55px" }}
                // validation for required inputs
                disabled={
                    !username
                    || !password}
                onClick={handleLogin}
            >
                {"Login"}
            </Button>
        </Stack>
        {loginFailed &&
        <Stack direction={"row"} justifyContent={"center"}>
            <h3 style={{ fontWeight: "600", fontSize: "15px", paddingBottom: "16px", color: "red" }}> Login Failed</h3>
            </Stack>
        }

    </Stack>

    );
}
