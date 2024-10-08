"use client"
import { usePathname } from 'next/navigation';
import { Box } from "@mui/material";
import ProblemStatement from "../../components/ProblemStatement";
import Solution from "./Solution";

export default function Problem() {

    const pathname = usePathname();

    return (
        <Box sx={{p: 1}}>
            <ProblemStatement
                number={pathname?.split("/")[1] ? pathname?.split("/")[1] : "1"}
                text={"Create a UI with 2 date pickers and show the difference in dates picked."}
            />
            <Solution />
        </Box>
    );
}