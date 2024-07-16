import { Box } from "@mui/material";

export default function Sidebar({currentExercise, setCurrentExcercise}) {

    const excerciseCount = 1;    

    return (
        <Box sx={{overflow: scroll}}>
            {
                [...Array(excerciseCount).keys()].map(key =>
                <Box
                    key={excerciseCount}
                    sx={{padding: "24px",
                        borderBottom: "1px solid #e7e7e7",
                        cursor: "pointer",
                        background: excerciseCount == excerciseCount ? "#efeef4" : "",
                        "&:hover": {
                            background: "#e5e5e5"
                        }
                    }}
                    onClick={() => setCurrentExcercise(excerciseCount)}
                >
                        {excerciseCount}
                </Box>
                )
            }
        </Box>
    );
}
