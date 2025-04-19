import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Header from './components/Header';

// Lazy load the pages
const DoctorsList = lazy(() => import('./pages/DoctorsList'));
const AppointmentsSummary = lazy(() => import('./pages/AppointmentsSummary'));

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<DoctorsList />} />
          <Route path="/appointments" element={<AppointmentsSummary />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes; 