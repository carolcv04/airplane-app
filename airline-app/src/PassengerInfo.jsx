import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to access previous state

const PassengerInfoPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation(); // Get the previous state (if any)

  // Access the totalCost passed from the previous page
  const { totalCost: initialTotalCost } = location.state || {};

  // States for passenger info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  // States for amenities
  const [addAmenities, setAddAmenities] = useState(false);
  const [checkedBags, setCheckedBags] = useState(0);

  // Price Constants
  const checkedBagPrice = 50;
  const amenitiesPrice = 75;

  // Calculate totals
  const amenitiesCost = addAmenities ? amenitiesPrice : 0;
  const checkedBagsCost = checkedBags * checkedBagPrice;

  // Final total cost calculation (initial flight cost + additional options)
  const totalCost = initialTotalCost + amenitiesCost + checkedBagsCost;

  const handleCheckedBagIncrease = () => setCheckedBags(checkedBags + 1);
  const handleCheckedBagDecrease = () =>
    setCheckedBags(Math.max(checkedBags - 1, 0));

  const handleSubmit = () => {
    // Collect passenger info
    const passengerInfo = {
      firstName,
      lastName,
      dob,
      addAmenities,
      checkedBags,
    };

    // Navigate to the next page (Seat Selection) with the current state and passenger info
    navigate("/seating", {
      state: {
        ...location.state, // Carry over all previous state (like flight details, etc.)
        passengerInfo, // Add passenger info to the state
        totalCost, // Update the total cost
      },
    });
  };

  return (
    <div className="passenger-info-page">
      <header className="header_container_depart">
        <h1 className="main-flight-header">Passenger Information</h1>
      </header>

      {/* Display Total Cost */}
      <div className="flight-header-container">
        <h1 className="flight-header">Total Cost: ${totalCost}</h1>
      </div>

      {/* Passenger Info Form */}
      <div className="passenger-info">
        <h2>
          <span>Passenger Information</span>
        </h2>

        <form className="passenger">
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Amenities Section */}
      <div className="amenities-section">
        <h2>
          <span>Amenities</span>
        </h2>
        <label className="ammenities-label">
          {/* Custom checkbox styling */}
          <label className="container">
            Add Amenities ($75)
            <input
              type="checkbox"
              checked={addAmenities}
              onChange={() => setAddAmenities(!addAmenities)}
            />
            <span className="checkmark"></span>
          </label>
        </label>
        <p>Price: ${amenitiesCost}</p>
      </div>

      {/* Checked Baggage Section */}
      <div className="checked-baggage-section">
        <h2>
          <span>Checked Baggage</span>
        </h2>
        <div className="baggage-control">
          <button onClick={handleCheckedBagDecrease}>-</button>
          <span>{checkedBags} Checked Bags</span>
          <button onClick={handleCheckedBagIncrease}>+</button>
        </div>
        <p>Price: ${checkedBagsCost}</p>
      </div>

      {/* Grand Total */}
      <div className="flight-header-container">
        <h1 className="flight-header">Grand Total: ${totalCost}</h1>
      </div>

      {/* Continue Button */}
      <button onClick={handleSubmit} className="continue-button">
        Continue to Next Section
      </button>
    </div>
  );
};

export default PassengerInfoPage;
