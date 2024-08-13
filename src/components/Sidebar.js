import { Box } from "@mui/material";

export default function Sidebar({currentExercise, setCurrentExcercise}) {

    const excerciseCount = 3;    

    return (
        <Box sx={{overflow: scroll}}>
            {
                [...Array(excerciseCount).keys()].map(key =>
                <Box
                    key={key}
                    sx={{padding: "24px",
                        borderBottom: "1px solid #e7e7e7",
                        cursor: "pointer",
                        background: (key + 1) == currentExercise ? "#efeef4" : "",
                        "&:hover": {
                            background: "#e5e5e5"
                        }
                    }}
                    onClick={() => setCurrentExcercise(key + 1)}
                >
                        {key + 1}
                </Box>
                )
            }
        </Box>
    );
}
