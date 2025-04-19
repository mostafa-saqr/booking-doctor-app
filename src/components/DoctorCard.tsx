import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Drawer,
} from '@mui/material';
import { LocationOn, AccessTime } from '@mui/icons-material';
import DoctorBooking from './DoctorBooking';
import { Doctor } from '../services/mockData';

interface DoctorCardProps extends Omit<Doctor, 'id'> {
  id: number;
  onBookAppointment: () => void;
  showBookingButton?: boolean;
  bookingInfo?: {
    date: string;
    time: string;
    onCancel: () => void;
  };
}

const DoctorCard = ({ 
  id,
  name, 
  specialty, 
  availability, 
  location, 
  onBookAppointment,
  showBookingButton = true,
  bookingInfo 
}: DoctorCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBookAppointment = () => {
    setIsDrawerOpen(true);
    onBookAppointment();
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
          alt={name}
          sx={{ 
            objectFit: 'cover',
            backgroundColor: 'grey.200',
            minHeight: 200
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip label={specialty} color="primary" size="small" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {availability}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>
          {bookingInfo && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Booking Date: {bookingInfo.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Time: {bookingInfo.time}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                onClick={bookingInfo.onCancel}
              >
                Cancel Appointment
              </Button>
            </Box>
          )}
          {showBookingButton && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
          )}
        </CardContent>
      </Card>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      >
        <DoctorBooking
          doctor={{ id, name, specialty, availability, location }}
          onClose={handleCloseDrawer}
        />
      </Drawer>
    </>
  );
};

export default DoctorCard; 