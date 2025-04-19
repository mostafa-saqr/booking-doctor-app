import { Container, Typography, Box } from '@mui/material';

const AppointmentsSummary = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Appointments Summary
        </Typography>
        {/* Appointments summary content will go here */}
      </Box>
    </Container>
  );
};

export default AppointmentsSummary; 