import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./main.css"; 

const BookingDepartPage = () => {
  const location = useLocation();
  const {
    location: departLocation,
    destination,
    departureDate,
    destinationDate,
    travellers,
  } = location.state || {}; //assigns & saves all the flight information

  //hard coded data
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

  //condtionals & variables to store returning & deparing flight and date, cost and flight selection. 
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

  /* used chat here */
  const firstAvailableDate = initialDates.find((date) => //finds a flight with the assigned date
    availableFlights.some((flight) => flight.availableDates.includes(date))
  );

  useEffect(() => {
    if (!selectedDepartureDate && firstAvailableDate) { //sets departure date
      setSelectedDepartureDate(firstAvailableDate);
    }
  }, [selectedDepartureDate, firstAvailableDate]);

  //filters return * departure flights
  const filteredFlights = availableFlights.filter((flight) =>
    flight.availableDates.includes(selectedDepartureDate)
  );

  const filteredReturnFlights = availableReturnFlights.filter((flight) =>
    flight.availableDates.includes(selectedReturnDate)
  );
  /* until here: utilized it as a refence for the logic of filtering return & departure flights and establishing the starting
  date based on user input*/


  const handleFlightSelect = (flight) => { //sets the flight information & cost for departure flight
    setSelectedFlight(flight);
    setTotalCost(flight.price); 
    setIsFlightSelected(true);

    const earliestReturnDate = initialDates.find( //finds return date later than sleected date
      (date) => new Date(date) > new Date(selectedDepartureDate)
    );
    if (earliestReturnDate) {
      setSelectedReturnDate(earliestReturnDate);
    }
  };

  const handleReturnFlightSelect = (flight) => {//sets the flight information & cost for departure flight
    setSelectedReturnFlight(flight);
    setTotalCost(selectedFlight.price + flight.price); // add return flight price to total cost
    setIsReturnFlightSelected(true);
  };

  const handleChangeFlight = () => { //handles if a user decides to change their departure flight
    setIsFlightSelected(false);
    setSelectedFlight(null);
    setSelectedDepartureDate(null);
    setTotalCost(0); // Reset total cost when changing flight
  };

  const handleChangeReturnFlight = () => { //handles if a user decides to change their return flight
    setIsReturnFlightSelected(false);
    setSelectedReturnFlight(null);
    /* used chat here */
    setTotalCost(selectedFlight ? selectedFlight.price : 0); //resets the cost
    /* until here: used it to figure out how to reset the cost*/
  };

  /* used chat here */
  const handleReturnDateChange = (direction) => { //handles if a user decides to change their return date
    const currentIndex = initialDates.indexOf(selectedReturnDate);
    let newIndex = currentIndex;


    if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === "next" && currentIndex < initialDates.length - 1) {
      newIndex = currentIndex + 1;
    }

    setSelectedReturnDate(initialDates[newIndex]);
  };
  /*until here: utilized it to figure out how i could navigate through available return dates  */ 

  const navigate = useNavigate();

  const handleContinue = () => { //handles passing the information onto the next page
    if (selectedFlight && selectedReturnFlight) {
      navigate("/passenger-info", {
        state: {
          departureFlight: selectedFlight,
          returnFlight: selectedReturnFlight,
          departureDate: selectedDepartureDate,
          returnDate: selectedReturnDate,
          totalCost,
        },
      });
    } else {
      alert("Please select both departure and return flights.");
    }
  };

  return (
    //main header information
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

      {/* departure flight selection: checks if a flight has not yet been selected */}
      {!isFlightSelected && (
        <div className="carousel-container">
          {/* used chat here */}
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
          {/* used until here: utilized it to figure out how to create a carousel item to iterate through flight dates */}
        </div>
      )}

      {/* available flights section: showcases all available departure flights if the user has not yet selected a flight &
      flights are available */}
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

            {filteredFlights.map((flight) => ( //structure for each individual departure available flight
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

      {/* if no flights available */}
      {!isFlightSelected && filteredFlights.length === 0 && (
        <h2>
          <span>No flights available for this date</span>
        </h2>
      )}

      {/* flight Summary (only when a flight is selected) */}
      {isFlightSelected && (
        <div className="flight-summary">
          <p className="departure-summary-title">
            {selectedFlight.departure} → {selectedFlight.destination} at{" "}
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


      {/* header is only showcased when return flight is not selected and departure flight is*/}
      {!isReturnFlightSelected && isFlightSelected && (
        <header className="flight-header-container">
          <h1 className="flight-header">Return Flight</h1>
        </header>
      )}

      {/* return flight selection */}
      {!isReturnFlightSelected && isFlightSelected && (
        /* used chat here */
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
        /* used until here: utilized it to figure out how to create a carousel item to iterate through flight dates */

      )}

      {/* available flights section: showcases all available returning flights if the user has not yet selected a flight &
      flights are available */}
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

              {filteredReturnFlights.map((flight) => ( //structure for each individual return available flight
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

      {/* if no return flights available */}
      {isFlightSelected &&
        filteredReturnFlights.length === 0 &&
        !isReturnFlightSelected && (
          <h2>
            <span>No return flights available for this date</span>
          </h2>
        )}
      {/* header is only showcased when return and departure flight is selected */}
      {isReturnFlightSelected && isFlightSelected && (
        <header className="flight-header-container">
          <h1 className="flight-header">Return Flight</h1>
        </header>
      )}

      {/* return flight summary (only when selected) */}
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

      {/* total cost & continue button only when both flights are selectedb*/}
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
