import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Login";
import MainPage from "./Mainpage";
import BookingDepartPage from "./BookingDepartPage";
import PassengerInfoPage from "./PassengerInfo"; 
import SeatSelectionPage from "./PassengerSeat";
import FinalSummaryPage from "./FlightSummary";
import ViewFlightsPage from "./ViewFlights";
import ViewPaymentPage from "./ViewPayments";
import BookingConfirmedPage from "./BookingConfirmation";

// App component with updated routing
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<MainPage />} />

        <Route path="/book-depart" element={<BookingDepartPage />} />

        <Route
          path="/passenger-info"
          element={<PassengerInfoPage initialTotalCost={100} />}
        />

        <Route path="/seating" element={<SeatSelectionPage />} />

        <Route path="/summary" element={<FinalSummaryPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/view-flights" element={<ViewFlightsPage />} />

        <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />

        <Route path="/view-payments" element={<ViewPaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
