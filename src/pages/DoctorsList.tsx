import { useState } from 'react';
import {
  Container,
  Typography,
  Box,

  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Paper,
} from '@mui/material';
import DoctorCard from '../components/DoctorCard';
import { doctors, specialties, availabilityOptions, Doctor } from '../services/mockData';

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 16];

const DoctorsList = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');

  const handleSpecialtyChange = (event: SelectChangeEvent) => {
    setSelectedSpecialty(event.target.value);
    setPage(1);
  };

  const handleAvailabilityChange = (event: SelectChangeEvent) => {
    setSelectedAvailability(event.target.value);
    setPage(1);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    console.log('Booking appointment for:', doctor.name);
    // Handle booking logic here
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (selectedSpecialty && doctor.specialty !== selectedSpecialty) return false;
    if (selectedAvailability && doctor.availability !== selectedAvailability) return false;
    return true;
  });

  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctors List
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Specialty</InputLabel>
            <Select
              value={selectedSpecialty}
              label="Specialty"
              onChange={handleSpecialtyChange}
            >
              <MenuItem value="">All Specialties</MenuItem>
              {specialties.map(specialty => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Availability</InputLabel>
            <Select
              value={selectedAvailability}
              label="Availability"
              onChange={handleAvailabilityChange}
            >
              <MenuItem value="">All Availability</MenuItem>
              {availabilityOptions.map(availability => (
                <MenuItem key={availability} value={availability}>
                  {availability}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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
          {paginatedDoctors.map(doctor => (
            <Box key={doctor.id}>
              <DoctorCard
                id={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                availability={doctor.availability}
                location={doctor.location}
                onBookAppointment={() => handleBookAppointment(doctor)}
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
                {`${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, filteredDoctors.length)} of ${filteredDoctors.length}`}
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

export default DoctorsList; 