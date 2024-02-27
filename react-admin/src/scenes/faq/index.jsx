import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I reset my password?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you've forgotten your password, you can reset it by visiting the password reset page and following the instructions.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I change my username?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can change your username by going to your account settings and selecting the option to edit your username.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What payment methods do you accept?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We currently accept payments via credit/debit cards, PayPal, and other secure payment methods. Check our payment options in the checkout process.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I contact customer support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our customer support team is available 24/7. You can reach out to us through our contact page or by sending an email to support@example.com.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is my personal information secure?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We take the security of your personal information seriously. Our platform employs advanced encryption and security measures to keep your data safe.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
