import { useState } from "react";
import { Box } from "@mui/material";
import Problem1 from "./problem1/Problem1";
import Problem2 from "./problem2/Problem2";

export default function RenderedProblem({currentExercise}) {
    return (
        <Box sx={{ p: 4 }}>
            {
                currentExercise == 1 &&
                <Problem1 />
            }
            {
                currentExercise == 2 &&
                <Problem2 />
            }
        </Box>
    );
}
