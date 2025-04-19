
  import React from "react";
  import { render, screen, fireEvent, waitFor } from "@testing-library/react";

  import { BookingProvider, useBooking } from "../context/BookingContext";
  import { Doctor } from "../services/mockData";
import DoctorBooking from "../components/DoctorBooking";
  
// ✅ Use your exact mockDoctor data
const mockDoctor: Doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    availability: "Available Today",
    location: "Downtown Medical Center",
  };
  
  // Helper to expose BookingContext
  const renderWithBookingContext = (ui: React.ReactElement) => {
    let context: any = null;
  
    const TestContextConsumer = () => {
      context = useBooking();
      return null;
    };
  
    const utils = render(
      <BookingProvider>
        {ui}
        <TestContextConsumer />
      </BookingProvider>
    );
  
    return { ...utils, context };
  };
  
  test("Trying to book doctor at 9:00 AM", async () => {
    const contextRef = { current: null as any };
  
    // Expose context
    const ContextTracker = () => {
      const context = useBooking();
      contextRef.current = context;
      return null;
    };
  
    render(
      <BookingProvider>
        <DoctorBooking doctor={mockDoctor} onClose={jest.fn()} />
        <ContextTracker />
      </BookingProvider>
    );
  
    fireEvent.click(screen.getByText("09:00 AM"));
    fireEvent.click(screen.getByText("Confirm Booking"));
  
    await waitFor(() => {
      const bookings = contextRef.current.bookedDoctors;
      expect(bookings.length).toBe(1);
      expect(bookings[0].id).toBe(mockDoctor.id);
      expect(bookings[0].bookingTime).toBe("09:00 AM");
    });
  });