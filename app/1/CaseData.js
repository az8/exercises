import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ImageBox from "./ImageBox";
import assessmentImg from "../../public/assessment.png";
import infoImg from "../../public/info.png";
import diceImg from "../../public/dice.png";
import heartImg from "../../public/heart.png";
import ProfileSection from "./ProfileSection";
import SubmittedCaseData from "./SubmittedCaseData";
import { ProfileStyles } from "./ProfileStyles";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    resume: "",
    visas: {
        "o-1": false,
        "eb-1A": false,
        "eb2-Niw": false,
        "iDon'tKnow": false,
    },
    helpText: "",
};


export default function CaseData() {

    const [profileData, setProfileData] = useState(initialState);

    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        event.stopPropagation();

        let newProfileData = {};

        if (event.target.name.toLowerCase().includes("firstname")) {
            newProfileData = { ...profileData, firstName: event.target.value }
        }

        if (event.target.name.toLowerCase().includes("lastname")) {
            newProfileData = { ...profileData, lastName: event.target.value }
        }

        if (event.target.name.toLowerCase().includes("email")) {
            newProfileData = { ...profileData, email: event.target.value }
        }

        if (event.target.name.toLowerCase().includes("linkedin")) {
            newProfileData = { ...profileData, linkedin: event.target.value }
        }

        if (event.target.name.toLowerCase().includes("resume")) {
            newProfileData = { ...profileData, resume: event.target.value }
        }

        if (event.target.name.toLowerCase().includes("helptext")) {
            newProfileData = { ...profileData, helpText: event.target.value }
        }
        if (event.target.name.toLowerCase().includes(`o-1`)) {
            newProfileData = { ...profileData, visas: { ...profileData.visas, "o-1": event.target.checked } }
        }
        if (event.target.name.toLowerCase().includes(`eb-1a`)) {
            newProfileData = { ...profileData, visas: { ...profileData.visas, "eb-1A": event.target.checked } }
        }
        if (event.target.name.toLowerCase().includes(`eb2-niw`)) {
            newProfileData = { ...profileData, visas: { ...profileData.visas, "eb2-Niw": event.target.checked } }
        }
        if (event.target.name.toLowerCase().includes(`idon'tknow`)) {
            newProfileData = { ...profileData, visas: { ...profileData.visas, "iDon'tKnow": event.target.checked } }
        }

        setProfileData(newProfileData);

    }

    const handleSubmission = async (data) => {
        try {
            const response = await fetch(
                'https://api.sampleapis.com/countries/countries',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            const data = await response.json();
            //   console.log(data);
        } catch (error) {
            //   console.log(error);
        } finally {
            setSubmitted(true);
        }
    };

    const handleBackNavigation = () => {
        setProfileData(initialState);
        setSubmitted(false);
    }

    return (<React.Fragment>
        {!submitted &&
            <Stack>
                <ImageBox height="200px" width="100%" src={assessmentImg?.src} />
                <Stack direction={"row"} justifyContent={"center"} sx={{ m: 4 }}>
                    <ImageBox height="50px" width="50px" src={infoImg?.src} />
                </Stack>
                <Stack direction={"row"} justifyContent={"center"}>
                    <h1 style={{ fontWeight: "600", fontSize: "20px" }}> Want to understand your visa option?</h1>
                </Stack>
                <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
                    <h1 style={{ width: "50%", fontWeight: "600", fontSize: "14px", textWrap: "pretty" }}> Submit the form below and our team of experienced attorneys will review your information and send a preliminary assesment of your case based on your goals. </h1>
                </Stack>
                {
                    Object.entries(profileData)
                        .filter(([key, value]) => key != "resume" && key != "helpText" && key != "visas")
                        .map(([key, value]) =>
                        (<React.Fragment key={`profile${key}`}>
                            <ProfileSection
                                title={key}
                                handleChange={handleInputChange}
                                value={value}
                                multiline={false}
                            />
                        </React.Fragment>
                        )
                        )
                }
                <Stack sx={{...ProfileStyles.profileSectionStyles, mb: 4}}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={ProfileStyles.profileFileInputStyles}
                    >
                        {profileData?.resume ? profileData?.resume : "Upload Resume"}
                        <input
                            type="file"
                            hidden
                            name="resume"
                            onChange={handleInputChange}
                        />
                    </Button>
                </Stack>
                <Stack direction={"row"} justifyContent={"center"} sx={{ m: 4 }}>
                    <ImageBox height="50px" width="50px" src={diceImg?.src} />
                </Stack>
                <Stack direction={"row"} justifyContent={"center"}>
                    <h1 style={{ fontWeight: "600", fontSize: "20px" }}> Visa categories of interest?</h1>
                </Stack>
                <Stack direction={"row"} justifyContent={"center"} sx={{ m: 4 }}>
                    <Stack>
                        {
                            Object.entries(profileData?.visas)
                                .map(([key, value]) =>
                                (<FormControlLabel
                                    label={key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
                                    key={`profileVisa${key}`}
                                    control={
                                        <Checkbox
                                            name={key}
                                            checked={value}
                                            onChange={handleInputChange}
                                            inputProps={{ 'aria-label': `profileVisa${key}` }}
                                        />
                                    }
                                />
                                )
                                )
                        }
                    </Stack>
                </Stack>
                <Stack direction={"row"} justifyContent={"center"} sx={{ m: 4 }}>
                    <ImageBox height="50px" width="50px" src={heartImg?.src} />
                </Stack>
                <Stack direction={"row"} justifyContent={"center"}>
                    <h1 style={{ fontWeight: "600", fontSize: "20px" }}> How can we help you?</h1>
                </Stack>
                <ProfileSection
                    title={"helpText"}
                    handleChange={handleInputChange}
                    value={profileData?.helpText}
                    multiline={true}
                />
                <Stack sx={{ ...ProfileStyles.profileSectionStyles, mb: 8 }}>
                    <Button
                        variant="contained"
                        sx={{ background: "#000000", height: "55px" }}
                        // validation for required inputs
                        disabled={
                            !profileData.firstName
                            || !profileData.lastName
                            || !profileData.email
                            || !profileData.linkedin
                            || !profileData.resume
                            || Object.entries(profileData?.visas).filter(([key, value]) => value === true).length < 1
                            || !profileData.helpText

                        }
                        onClick={() => handleSubmission(profileData)}
                    >
                        {"Submit"}
                    </Button>
                </Stack>
            </Stack>
        }
        {submitted &&
            <SubmittedCaseData handleBack={() => handleBackNavigation()}/>
        }
    </React.Fragment>
    );
}
