import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import AppRoutes from './routes';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookingProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BookingProvider>
    </ThemeProvider>
  );
}

export default App;
