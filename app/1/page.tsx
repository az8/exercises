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
                text={"DIFF RENDERER - Fetch an api to get git commits response [{id: '1', name: 'Commit1', diff: 'diff1'}] and dispplay selectable commits and files with file diff."}
            />
            <Solution />
        </Box>
    );
}