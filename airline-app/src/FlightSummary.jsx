import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SummaryPage = () => {
  // Get the state passed from the previous page (PassengerInfoPage or SeatSelectionPage)
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function

  const {
    departureFlight,
    returnFlight,
    passengerInfo,
    selectedSeats,
    totalCost,
  } = location.state || {}; // Default to empty object if no state is passed

  // Cancel Booking Functionality
  const handleCancelBooking = () => {
    // Navigate back to the home page or main page (adjust the path as needed)
    navigate("/");
  };
<<<<<<< HEAD
  const handleBookingConfirmation = () => {
    // Navigate back to the home page or main page (adjust the path as needed)
    navigate("/booking-confirmation");
  };
=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a

  return (
    <div className="summary-page">
      <header className="header-container">
        <h1>Booking Summary</h1>
      </header>

      <div className="summary-container">
        {/* Flight Details */}
        <h2>
          <span>Flight Details</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Departure Flight:</strong>{" "}
          {departureFlight ? departureFlight.departure : "N/A"} →{" "}
          {departureFlight ? departureFlight.destination : "N/A"} on{" "}
          {departureFlight ? departureFlight.departureTime : "N/A"}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Return Flight:</strong>{" "}
          {returnFlight ? returnFlight.departure : "N/A"} →{" "}
          {returnFlight ? returnFlight.destination : "N/A"} on{" "}
          {returnFlight ? returnFlight.departureTime : "N/A"}
        </p>

        {/* Passenger Information */}
        <h2>
          <span>Passenger Information</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Name:</strong>{" "}
          {passengerInfo
            ? `${passengerInfo.firstName} ${passengerInfo.lastName}`
            : "N/A"}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Date of Birth:</strong>{" "}
          {passengerInfo ? passengerInfo.dob : "N/A"}
        </p>

        {/* Selected Seats */}
        <h2>
          <span>Selected Seats</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Departure Seat:</strong>{" "}
          {selectedSeats ? selectedSeats.departureSeat : "N/A"}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Return Seat:</strong>{" "}
          {selectedSeats ? selectedSeats.returnSeat : "N/A"}
        </p>

        {/* Additional Options (Amenities & Bags) */}
        <h2>
          <span>Amenities & Checked Bags</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Checked Bags:</strong>{" "}
          {passengerInfo ? passengerInfo.checkedBags : "N/A"} bags
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Amenities Selected:</strong>{" "}
          {passengerInfo ? (passengerInfo.addAmenities ? "Yes" : "No") : "N/A"}
        </p>

        {/* Total Cost */}
        <h2>
          <span>Total Cost</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Total:</strong> $
          {totalCost ? totalCost : "N/A"}
        </p>

        {/* Confirmation and Cancel Booking Buttons */}
        <div className="flight-summary-button-container">
          <button
<<<<<<< HEAD
            onClick={handleBookingConfirmation}
=======
            onClick={() => alert("Booking Confirmed!")}
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
            className="confirm-button"
          >
            Confirm Booking
          </button>
          <button
            onClick={handleCancelBooking} // Handle cancel click
            className="confirm-button"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;