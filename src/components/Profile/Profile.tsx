import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import UserInfo from "./UserInfo";

import styles from "./profile.module.scss";

function Profile() {
  return (
    <Container className={styles.container} maxWidth="md">
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          aria-controls="profile"
          expandIcon={<ExpandMoreIcon />}
          id="profile"
        >
          <Typography variant="h4">Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserInfo />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Profile;
