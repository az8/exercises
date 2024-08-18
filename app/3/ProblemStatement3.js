import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProblemStatement3() {
    return (
        <Accordion defaultExpanded sc={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                Problem 3
            </AccordionSummary>
            <AccordionDetails>
                Fetch an api to show countries data and delete row should show error on delete api fail.
            </AccordionDetails>
        </Accordion>
    );
}
