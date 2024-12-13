import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const {
    departureFlight,
    returnFlight,
    passengerInfo,
    selectedSeats,
    totalCost,
  } = location.state || {}; /* accesses all the information from bookingdepart
  page, empty if no information passed */

  // Cancel Booking Functionality
  const handleCancelBooking = () => {
    // Navigate back to the home page or main page (adjust the path as needed)
    navigate("/");
  };
  
  const handleBookingConfirmation = () => {
    // Navigate back to the home page or main page (adjust the path as needed)
    navigate("/booking-confirmation");
  };

  return (
    <div className="summary-page">
      <header className="header-container">
        <h1>Booking Summary</h1>
      </header>
      {/* departure and return flight summary */}
      <div className="summary-container">
        {/* flight details */}
        <h2>
          <span>Flight Details</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Departure Flight:</strong>{" "}
          {departureFlight.departure} → {" "}
          {departureFlight.destination} on {" "}
          {departureFlight.departureTime}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Return Flight:</strong>{" "}
          {returnFlight.departure} → {" "}
          {returnFlight.destination} on {" "}
          {returnFlight.departureTime}
        </p>

        {/* passenger information input */}
        <h2>
          <span>Passenger Information</span>
        </h2>
        {/* used chatgbt here */}
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Name:</strong>{" "}
          {`${passengerInfo.firstName} ${passengerInfo.lastName}`}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Date of Birth:</strong>{" "}
          {passengerInfo.dob}
        </p>
        {/* used until here: utilized it to structure user information */}


        {/* selected seats */}
        {/* used chatgbt here */}
        <h2>
          <span>Selected Seats</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Departure Seat:</strong>{" "}
          {selectedSeats.departureSeat}
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Return Seat:</strong>{" "}
          {selectedSeats.returnSea}
        </p>
        {/* used until here: utilized it to structure seat information */}


        {/* Additional Options (Amenities & Bags) */}
        {/* used chatgbt here */}
        <h2>
          <span>Amenities & Checked Bags</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Checked Bags:</strong>{" "}
          {passengerInfo.checkedBags} bags
        </p>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Amenities Selected:</strong>{" "}
          {(passengerInfo.addAmenities ? "Yes" : "No")}
        </p>
        {/* used until here: utilized it to structure amenities information */}


        {/* total cost */}
        <h2>
          <span>Total Cost</span>
        </h2>
        <p className="flight-summary-2">
          <strong className="flight-summary-info">Total:</strong> $
          {totalCost}
        </p>

        {/* confirmation and cancel booking buttons */}
        <div className="flight-summary-button-container">
          <button
            onClick={handleBookingConfirmation} // handle confirmation
            className="confirm-button"
          >
            Confirm Booking
          </button>
          <button
            onClick={handleCancelBooking} // handle cancel click
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
