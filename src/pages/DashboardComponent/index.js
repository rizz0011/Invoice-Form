import React, { useEffect } from "react";
import InvoiceForm from "../CreateInvoiceForm";
import { Container, Button, Grid, Stack } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [displayData, setDisplayData] = React.useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username")
    if (!username) {
      navigate("/");
    }
  }, [navigate]); 

  const hanndleDisplayData = () => {
    setDisplayData(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid sx={{ pl: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleLogout}
            variant="outlined"
            component="label"
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>

          <Button
            onClick={hanndleDisplayData}
            variant="outlined"
            component="label"
          >
            Display Data
          </Button>
        </Stack>
      </Grid>

      <InvoiceForm displayData={displayData} setDisplayData={setDisplayData} />
    </Container>
  );
}
