import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your page components
import LoginPage from "./Login";
import MainPage from "./Mainpage";
import BookingDepartPage from "./BookingDepartPage";
import PassengerInfoPage from "./PassengerInfo"; // Make sure this file is correctly named
import SeatSelectionPage from "./PassengerSeat"; // Assuming this is your seat selection page
import FinalSummaryPage from "./FlightSummary";
import ViewFlightsPage from "./ViewFlights";
import ViewPaymentPage from "./ViewPayments";
import BookingConfirmedPage from "./BookingConfirmation";

// App component with updated routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Define all your routes here */}

        {/* Main page route */}
        <Route path="/" element={<MainPage />} />

        {/* Booking Depart Page */}
        <Route path="/book-depart" element={<BookingDepartPage />} />

        {/* Passenger Information Page */}
        <Route
          path="/passenger-info"
          element={<PassengerInfoPage initialTotalCost={100} />}
        />

        {/* Seat Selection Page */}
        <Route path="/seating" element={<SeatSelectionPage />} />

        {/* Final Summary Page */}
        <Route path="/summary" element={<FinalSummaryPage />} />

        {/* Optional: Add Login page route */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/view-flights" element={<ViewFlightsPage />} />

        <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />

        <Route path="/view-payments" element={<ViewPaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
