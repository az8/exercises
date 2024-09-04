import { Box } from "@mui/material";

export default function ImageBox({ height, src, width, }) {

    return (
        <Box>
            <Box sx={{
                width: width,
                height: height,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }} />
        </Box>
    );
}
