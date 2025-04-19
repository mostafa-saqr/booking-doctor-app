import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import Header from './components/Header';

// Lazy load the pages
const DoctorsList = lazy(() => import('./pages/DoctorsList'));
const AppointmentsSummary = lazy(() => import('./pages/AppointmentsSummary'));

function App() {
  return (
    <Router>
      <CssBaseline />
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
    </Router>
  );
}

export default App;
