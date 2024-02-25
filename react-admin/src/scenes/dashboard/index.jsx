import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";

const Dashboard = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  )
};

export default Dashboard;