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
                Problem 1
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    Create A page PUBLICLY available for prospects to fill and show confirmation on submission at route /1
                </div>
                <div>
                    Create A protected page available for admins to manage at route /1/admin
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
