import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

const PassengerInfoPage = () => {

  const navigate = useNavigate(); 
  const location = useLocation(); 
  const { totalCost: initialTotalCost } = location.state || {};

  const checkedBagPrice = 50;
  const amenitiesPrice = 75;

  //conditionals & variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); 
  const [addAmenities, setAddAmenities] = useState(false);
  const [checkedBags, setCheckedBags] = useState(0);
  const amenitiesCost = addAmenities ? amenitiesPrice : 0;
  const checkedBagsCost = checkedBags * checkedBagPrice;

  // final total cost calculation (initial flight cost + additional ammeties, baggage etc)
  const totalCost = initialTotalCost + amenitiesCost + checkedBagsCost;

  const handleCheckedBagIncrease = () => setCheckedBags(checkedBags + 1);
  const handleCheckedBagDecrease = () =>
    setCheckedBags(Math.max(checkedBags - 1, 0));

  const handleSubmit = () => {
    // collect passenger info
    const passengerInfo = {
      firstName,
      lastName,
      dob,
      addAmenities,
      checkedBags,
    };
    
    /* used chatgbt here */
    navigate("/seating", {
      state: {
        ...location.state, // carry over all previous state
        passengerInfo, // add passenger info to the state
        totalCost,
      },
    });

    /* until here: utilized it to undertand how to carry over all the previous states aka information */

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
              /* used chatgbt here */
              onChange={(e) => setFirstName(e.target.value)}
              /* used until here: understand how to update values after chnages have been made */
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              /* used chatgbt here */
              onChange={(e) => setLastName(e.target.value)}
              /* used until here: understand how to update values after chnages have been made */

              placeholder="Enter your last name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              /* used chatgbt here */
              onChange={(e) => setDob(e.target.value)}
              /* used until here: understand how to update values after chnages have been made */

            />
          </div>
        </form>
      </div>

      {/* amenities section */}
      <div className="amenities-section">
        <h2>
          <span>Amenities</span>
        </h2>
        <label className="ammenities-label">
          {/* custom checkbox styling */}
          {/* used chatgbt here */}
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
      {/* used until here: utilized it to get help on how to set up a check box */}

      {/* Checked Baggage Section */}
      <div className="checked-baggage-section">
        <h2>
          <span>Checked Baggage</span>
        </h2>
        {/* used chatgbt here */}
        <div className="baggage-control">
          <button onClick={handleCheckedBagDecrease}>-</button>
          <span>{checkedBags} Checked Bags</span>
          <button onClick={handleCheckedBagIncrease}>+</button>
          {/* until here: utolized to figure out how to do baggage control */}
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
