import React from "react";
import { Button, Stack } from "@mui/material";
import ImageBox from "./ImageBox";
import infoImg from "../../public/info.png";
import { ProfileStyles } from "./ProfileStyles";


export default function SubmittedCaseData({ handleBack }) {

    return (<Stack>
        <Stack direction={"row"} justifyContent={"center"} sx={{ m: 4 }}>
            <ImageBox height="50px" width="50px" src={infoImg?.src} />
        </Stack>
        <Stack direction={"row"} justifyContent={"center"}>
            <h1 style={{ fontWeight: "600", fontSize: "20px" }}> Thank You</h1>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
            <h1 style={{ width: "50%", fontWeight: "600", fontSize: "14px", textWrap: "pretty" }}> Your information was submitted to our team of immigration attorneys. Expect an email from our team. </h1>
        </Stack>

        <Stack sx={{ ...ProfileStyles.profileSectionStyles, mb: 8 }}>
            <Button
                variant="contained"
                sx={{ background: "#000000", height: "55px" }}
                onClick={handleBack}
            >
                {"Go Back To Homepage"}
            </Button>
        </Stack>
    </Stack>
    );
}
