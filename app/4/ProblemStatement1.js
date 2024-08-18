import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProblemStatement1() {
    return (
        <Accordion defaultExpanded sc={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                Problem 4
            </AccordionSummary>
            <AccordionDetails>
                Create a UI with 2 date pickers and show the difference in dates picked.
            </AccordionDetails>
        </Accordion>
    );
}
