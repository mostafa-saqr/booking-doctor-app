import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Paper,
  Button,
} from '@mui/material';
import { useBooking } from '../context/BookingContext';
import DoctorCard from '../components/DoctorCard';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 16];

const AppointmentsSummary = () => {
  const { bookedDoctors, removeBooking } = useBooking();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleRemoveBooking = (doctorId: number, bookingTime: string) => {
    removeBooking(doctorId, bookingTime);
  };

  const handleBookMore = () => {
    navigate('/');
  };

  const paginatedDoctors = bookedDoctors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(bookedDoctors.length / itemsPerPage);

  if (bookedDoctors.length === 0) {
    return (
      <Container>
        <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            No Appointments Booked
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't booked any appointments yet.
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleBookMore}
          >
            Book an Appointment
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" component="h1">
            Your Appointments
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleBookMore}
          >
            Book More
          </Button>
        </Stack>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: 3,
            '& > *': {
              width: '100%'
            }
          }}
        >
          {paginatedDoctors.map((doctor) => (
            <Box key={`${doctor.id}-${doctor.bookingTime}`}>
              <DoctorCard
                id={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                availability="Booked"
                location={doctor.location}
                onBookAppointment={() => {}}
                showBookingButton={false}
                bookingInfo={{
                  date: doctor.bookingDate,
                  time: doctor.bookingTime,
                  onCancel: () => handleRemoveBooking(doctor.id, doctor.bookingTime)
                }}
              />
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Paper elevation={0} sx={{ mt: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Items per page:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={itemsPerPage.toString()}
                  onChange={handleItemsPerPageChange}
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">
                {`${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, bookedDoctors.length)} of ${bookedDoctors.length}`}
              </Typography>
            </Stack>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default AppointmentsSummary; 