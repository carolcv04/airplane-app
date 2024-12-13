import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import seatingMap from "./assets/seating.png"; 

const SeatSelectionPage = () => {
  const location = useLocation();
  const { passengerInfo, totalCost } = location.state || {};

  const [selectedDepartureSeat, setSelectedDepartureSeat] = useState(null);
  const [selectedReturnSeat, setSelectedReturnSeat] = useState(null);

  const availableSeats = [
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
    "3A",
    "3B",
    "3C",
    "3D",
  ];

  const handleSeatSelect = (seat, type) => {
    if (type === "departure") {
      setSelectedDepartureSeat(seat);
    } else if (type === "return") {
      setSelectedReturnSeat(seat);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    // Construct an object with the selected seats
    const selectedSeats = {
      departureSeat: selectedDepartureSeat,
      returnSeat: selectedReturnSeat,
    };

    navigate("/summary", {
      state: {
        ...location.state, // Carry over all previous state (e.g., passengerInfo, totalCost)
        selectedSeats, // Add the selected seats to the state
      },
    });
  };

  return (
    <div className="seat-selection-page">
      <header className="header-container">
        <h1>Seat Selection</h1>
      </header>

      <div className="seat-selection-container">
        <div className="seat-selection-section">
          <div className="seat-lists">
            <div className="seat-list">
              <h2>
                <span>Select a Seat for Your Departure Flight</span>
              </h2>
              <ul>
                {availableSeats.map((seat) => (
                  <li
                    key={seat}
                    className={`seat-item ${
                      selectedDepartureSeat === seat ? "selected" : ""
                    }`}
                    onClick={() => handleSeatSelect(seat, "departure")}
                  >
                    {seat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="seat-list">
              <h2>
                <span>Select a Seat for Your Return Flight</span>
              </h2>
              <ul>
                {availableSeats.map((seat) => (
                  <li
                    key={seat}
                    className={`seat-item ${
                      selectedReturnSeat === seat ? "selected" : ""
                    }`}
                    onClick={() => handleSeatSelect(seat, "return")}
                  >
                    {seat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="seat-map">
            <img src={seatingMap} alt="Seat Map" className="seat-map-image" />
          </div>
        </div>
      </div>

      <div className="continue-button-container">
        <button onClick={handleSubmit} className="continue-button">
          Continue to Next Section
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
