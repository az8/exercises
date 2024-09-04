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
                text={"Create A page PUBLICLY available for prospects to fill and show confirmation on submission at route /1. Create A protected page available for admins to manage at route /1/admin"}
            />
            <Solution />
        </Box>
    );
}