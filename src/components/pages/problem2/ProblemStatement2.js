import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProblemStatement2() {
    return (
        <Accordion defaultExpanded sc={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                Problem 2
            </AccordionSummary>
            <AccordionDetails>
                Fetch an api to suggest results on typing.
            </AccordionDetails>
        </Accordion>
    );
}
