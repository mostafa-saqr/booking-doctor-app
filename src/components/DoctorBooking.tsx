import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Doctor } from '../services/mockData';

interface DoctorBookingProps {
  doctor: Doctor;
  onClose: () => void;
}

// Mock time slots for demonstration
const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

const DoctorBooking = ({ doctor, onClose }: DoctorBookingProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleConfirm = () => {
    if (!selectedTime) return;
    
    // Here you would typically make an API call to book the appointment
    console.log('Booking confirmed for:', selectedTime);
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <>
      <Box sx={{ width: 400 }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backgroundColor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h6">
            Book Appointment
          </Typography>
          <IconButton 
            onClick={onClose}
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Doctor Info */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {doctor.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {doctor.specialty}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.location}
            </Typography>
          </Stack>
          <Divider />
        </Box>

        {/* Available Time Slots */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Available Time Slots
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 1 
          }}>
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "contained" : "outlined"}
                size="small"
                fullWidth
                onClick={() => handleTimeSelect(time)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  backgroundColor: selectedTime === time ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedTime === time ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!selectedTime}
            >
              Confirm Booking
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Success Message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Appointment booked successfully for {selectedTime}!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DoctorBooking; 