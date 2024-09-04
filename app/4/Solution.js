import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Solution() {

    const [date1, setDate1] = useState(dayjs('2024-07-15'));
    const [date2, setDate2] = useState(dayjs('2024-07-16'));
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const diffMilliseconds = Math.abs(date2?.$d - date1?.$d);
        const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
        setDuration(diffDays + ( diffDays > 1 ? " days" : " day" ));
    }, [date1, date2]);

    return (
        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    label="First Date Picker"
                    value={date1}
                    onChange={(newValue) => { setDate1(newValue); console.log(newValue); }}
                />
                <DatePicker
                    label="Second Date Picker"
                    value={date2}
                    onChange={(newValue) => { setDate2(newValue); console.log(newValue); }}
                />
            </DemoContainer>
        </LocalizationProvider>
        <Box sx={{pt: 2}}> Difference: {duration}</Box>
        </Box>
    );
}
