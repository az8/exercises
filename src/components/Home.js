import { useState } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import RenderedProblem from "./pages/RenderedProblem";

export default function Home() {
    const [ currentExercise, setCurrentExcercise] = useState(1);
    return (
        <Grid container sx={{ width: "100%", p: 0, m: 0 }}>
            <Grid item
                xs={1}
                sx={{height: "100vh", borderRight: "1px solid #e7e7e7"}}
            ><Sidebar currentExercise={currentExercise} setCurrentExcercise={setCurrentExcercise} />
            </Grid>
            <Grid item
                xs={11}
            >
                <RenderedProblem currentExercise={currentExercise} />
            </Grid>
        </Grid>
    );
}
