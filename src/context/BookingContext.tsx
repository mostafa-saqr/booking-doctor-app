import { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor } from '../services/mockData';

interface BookedDoctor extends Doctor {
  bookingTime: string;
  bookingDate: string;
}

interface BookingContextType {
  bookedDoctors: BookedDoctor[];
  addBooking: (doctor: Doctor, time: string) => void;
  removeBooking: (doctorId: number, bookingTime: string) => void;
  isTimeSlotBooked: (doctorId: number, time: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookedDoctors, setBookedDoctors] = useState<BookedDoctor[]>([]);

  const isTimeSlotBooked = (doctorId: number, time: string) => {
    return bookedDoctors.some(
      booking => booking.id === doctorId && booking.bookingTime === time
    );
  };

  const addBooking = (doctor: Doctor, time: string) => {
    const bookingDate = new Date().toISOString().split('T')[0];
    setBookedDoctors(prev => [
      ...prev,
      { ...doctor, bookingTime: time, bookingDate }
    ]);
  };

  const removeBooking = (doctorId: number, bookingTime: string) => {
    setBookedDoctors(prev => 
      prev.filter(booking => 
        !(booking.id === doctorId && booking.bookingTime === bookingTime)
      )
    );
  };

  return (
    <BookingContext.Provider value={{ 
      bookedDoctors, 
      addBooking, 
      removeBooking,
      isTimeSlotBooked
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 