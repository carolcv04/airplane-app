import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./main.css"; // Assuming your CSS file is still the same

const BookingDepartPage = () => {
  const location = useLocation();
  const {
    location: departLocation,
    destination,
    departureDate,
    destinationDate,
    travellers,
  } = location.state || {};

  const initialDates = [
    "2024-12-01",
    "2024-12-02",
    "2024-12-03",
    "2024-12-04",
    "2024-12-05",
    "2024-12-06",
    "2024-12-07",
    "2024-12-08",
    "2024-12-09",
    "2024-12-10",
  ];

  const availableFlights = [
    {
      id: 1,
      departure: "SNA",
      destination: "SJU",
      departureTime: "10:00 AM",
      price: 300,
      availableDates: ["2024-12-01", "2024-12-03", "2024-12-05"],
    },
    {
      id: 2,
      departure: "SNA",
      destination: "SJU",
      departureTime: "2:00 PM",
      price: 350,
      availableDates: ["2024-12-02", "2024-12-04", "2024-12-06"],
    },
    {
      id: 3,
      departure: "SNA",
      destination: "SJU",
      departureTime: "6:00 PM",
      price: 400,
      availableDates: ["2024-12-01", "2024-12-04", "2024-12-07"],
    },
  ];

  const availableReturnFlights = [
    {
      id: 1,
      departure: "SJU",
      destination: "SNA",
      departureTime: "10:00 AM",
      price: 300,
      availableDates: ["2024-12-02", "2024-12-03", "2024-12-05"],
    },
    {
      id: 2,
      departure: "SJU",
      destination: "SNA",
      departureTime: "2:00 PM",
      price: 350,
      availableDates: ["2024-12-03", "2024-12-04", "2024-12-06"],
    },
    {
      id: 3,
      departure: "SJU",
      destination: "SNA",
      departureTime: "6:00 PM",
      price: 400,
      availableDates: ["2024-12-02", "2024-12-05", "2024-12-07"],
    },
  ];

  const [selectedDepartureDate, setSelectedDepartureDate] = useState(
    departureDate || null
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState(
    destinationDate || null
  );
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [isFlightSelected, setIsFlightSelected] = useState(false);
  const [isReturnFlightSelected, setIsReturnFlightSelected] = useState(false);

  const firstAvailableDate = initialDates.find((date) =>
    availableFlights.some((flight) => flight.availableDates.includes(date))
  );

  useEffect(() => {
    if (!selectedDepartureDate && firstAvailableDate) {
      setSelectedDepartureDate(firstAvailableDate);
    }
  }, [selectedDepartureDate, firstAvailableDate]);

  const filteredFlights = availableFlights.filter((flight) =>
    flight.availableDates.includes(selectedDepartureDate)
  );

  const filteredReturnFlights = availableReturnFlights.filter((flight) =>
    flight.availableDates.includes(selectedReturnDate)
  );

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setTotalCost(flight.price); // Set the total cost to the price of the selected departure flight
    setIsFlightSelected(true);

    const earliestReturnDate = initialDates.find(
      (date) => new Date(date) > new Date(selectedDepartureDate)
    );
    if (earliestReturnDate) {
      setSelectedReturnDate(earliestReturnDate);
    }
  };

  const handleReturnFlightSelect = (flight) => {
    setSelectedReturnFlight(flight);
    setTotalCost(selectedFlight.price + flight.price); // Add return flight price to total cost
    setIsReturnFlightSelected(true);
  };

  const handleChangeFlight = () => {
    setIsFlightSelected(false);
    setSelectedFlight(null);
    setSelectedDepartureDate(null);
    setTotalCost(0); // Reset total cost when changing flight
  };

  const handleChangeReturnFlight = () => {
    setIsReturnFlightSelected(false);
    setSelectedReturnFlight(null);
    setTotalCost(selectedFlight ? selectedFlight.price : 0); // Reset total cost when changing return flight
  };

  const handleReturnDateChange = (direction) => {
    const currentIndex = initialDates.indexOf(selectedReturnDate);
    let newIndex = currentIndex;

    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "next" && currentIndex < initialDates.length - 1) {
      newIndex = currentIndex + 1;
    }

    setSelectedReturnDate(initialDates[newIndex]);
  };

  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedFlight && selectedReturnFlight) {
      navigate("/passenger-info", {
        state: {
          departureFlight: selectedFlight,
          returnFlight: selectedReturnFlight,
          departureDate: selectedDepartureDate,
          returnDate: selectedReturnDate,
          totalCost, // Pass the total cost
        },
      });
    } else {
      alert("Please select both departure and return flights.");
    }
  };

  return (
    <div className="login-page">
      <header className="section_container header_container">
        <h1 className="section_header">Airline App</h1>
      </header>

      <header className="header_container_depart">
        <h1 className="main-flight-header">Choose flights</h1>
      </header>

      <header className="flight-header-container">
        <h1 className="flight-header">Departure Flight</h1>
      </header>

      {/* Departure flight selection */}
      {!isFlightSelected && (
        <div className="carousel-container">
          <button
            onClick={() => {
              const currentIndex = initialDates.indexOf(selectedDepartureDate);
              if (currentIndex > 0) {
                setSelectedDepartureDate(initialDates[currentIndex - 1]);
              }
            }}
            className="carousel-button left"
          >
            &#8249;
          </button>
          <div className="carousel-item">
            <span className="date">{selectedDepartureDate}</span>
          </div>
          <button
            onClick={() => {
              const currentIndex = initialDates.indexOf(selectedDepartureDate);
              if (currentIndex < initialDates.length - 1) {
                setSelectedDepartureDate(initialDates[currentIndex + 1]);
              }
            }}
            className="carousel-button right"
          >
            &#8250;
          </button>
        </div>
      )}

      {/* Available Flights section */}
      {!isFlightSelected && filteredFlights.length > 0 && (
        <div className="flights-container">
          <div className="flight-list">
            <div className="available-flights-container">
              <h2>
                <span className="available-flights">
                  Available Flights on {selectedDepartureDate}
                </span>
              </h2>
            </div>

            {filteredFlights.map((flight) => (
              <div key={flight.id} className="flight-item">
                <p className="flight-selection-title">
                  {flight.departure} → {flight.destination}
                </p>
                <div className="flight-item-summ">
                  <p>Departure Time: {flight.departureTime}</p>
                  <p>Price: ${flight.price}</p>
                </div>
                <button
                  className="flight-select-button"
                  onClick={() => handleFlightSelect(flight)}
                >
                  Select Departure Flight
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* If no flights available */}
      {!isFlightSelected && filteredFlights.length === 0 && (
        <h2>No flights available for this date</h2>
      )}

      {/* Flight Summary (only when a flight is selected) */}
      {isFlightSelected && (
        <div className="flight-summary">
          <p className="departure-summary-title">
            {selectedFlight.departure} → {selectedFlight.destination} at x
            {selectedFlight.departureTime}
          </p>
          <div className="depart-summary">
            <p>Departure Date: {selectedDepartureDate}</p>
            <p>Price: ${selectedFlight.price}</p>
          </div>
          <button onClick={handleChangeFlight} className="change-flight-button">
            Change Departure Flight
          </button>
        </div>
      )}

      {!isReturnFlightSelected && isFlightSelected && (
        <header className="flight-header-container">
          <h1 className="flight-header">Return Flight</h1>
        </header>
      )}

      {/* Return flight selection */}
      {!isReturnFlightSelected && isFlightSelected && (
        <div className="carousel-container">
          <button
            onClick={() => handleReturnDateChange("prev")}
            className="carousel-button left"
          >
            &#8249;
          </button>
          <div className="carousel-item">
            <span className="date">{selectedReturnDate}</span>
          </div>
          <button
            onClick={() => handleReturnDateChange("next")}
            className="carousel-button right"
          >
            &#8250;
          </button>
        </div>
      )}

      {/* Available Return Flights */}
      {isFlightSelected &&
        filteredReturnFlights.length > 0 &&
        !isReturnFlightSelected && (
          <div className="flights-container">
            <div className="flight-list">
              <div className="available-flights-container">
                <h2>
                  <span className="available-flights">
                    Available Return Flights on {selectedReturnDate}
                  </span>
                </h2>
              </div>

              {filteredReturnFlights.map((flight) => (
                <div key={flight.id} className="flight-item">
                  <p className="flight-selection-title">
                    {flight.departure} → {flight.destination}
                  </p>
                  <div className="flight-item-summ">
                    <p>Departure Time: {flight.departureTime}</p>
                    <p>Price: ${flight.price}</p>
                  </div>
                  <button
                    className="flight-select-button"
                    onClick={() => handleReturnFlightSelect(flight)}
                  >
                    Select Return Flight
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* If no return flights available */}
      {isFlightSelected &&
        filteredReturnFlights.length === 0 &&
        !isReturnFlightSelected && (
          <h2>
            <span>No return flights available for this date</span>
          </h2>
        )}

      {isReturnFlightSelected && isFlightSelected && (
        <header className="flight-header-container">
          <h1 className="flight-header">Return Flight</h1>
        </header>
      )}

      {/* Return Flight Summary (only when selected) */}
      {isReturnFlightSelected && isFlightSelected && (
        <div className="flight-summary">
          <p className="departure-summary-title">
            {selectedReturnFlight.departure} →{" "}
            {selectedReturnFlight.destination} at{" "}
            {selectedReturnFlight.departureTime}
          </p>
          <div className="depart-summary">
            <p>Return Date: {selectedReturnDate}</p>
            <p>Price: ${selectedReturnFlight.price}</p>
          </div>
          <button
            onClick={handleChangeReturnFlight}
            className="change-flight-button"
          >
            Change Return Flight
          </button>
        </div>
      )}

      {/* Total Cost Display */}
      {isReturnFlightSelected && isFlightSelected && (
        <div className="total-cost">
          <p>Total Cost: ${totalCost}</p>
          <button onClick={handleContinue} className="continue-button-flight">
            Continue to Passenger Info
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDepartPage;
