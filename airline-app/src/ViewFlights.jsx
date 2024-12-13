import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

const ViewFlightsPage = () => {
  const [customerFlights, setCustomerFlights] = useState(null);
  const [isFlightBooked, setIsFlightBooked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || {}; // user object passed from MainPage or LoginPage
  const customerId = user ? user.userId : null; // customerId from the logged-in user

  const handleMainPage = () => {
    navigate("/", { state: { user } });
  };

  const flightsData = [
    {
      customerId: 1,
      departureFlight: {
        departureDate: "2024-12-15",
        departureAirport: "JFK",
        arrivalAirport: "LAX",
      },
      returnFlight: {
        departureDate: "2024-12-20",
        departureAirport: "LAX",
        arrivalAirport: "JFK",
      },
      passengerInfo: {
        name: user.name,
        email: user.email,
      },
      selectedSeats: ["12A", "12B"],
      totalCost: 500,
    },
    {
      customerId: 2,
      departureFlight: {
        departureDate: "2024-12-18",
        departureAirport: "ORD",
        arrivalAirport: "SFO",
      },
      returnFlight: {
        departureDate: "2024-12-25",
        departureAirport: "SFO",
        arrivalAirport: "ORD",
      },
      passengerInfo: {
        name: user.name,
      },
      selectedSeats: ["5C", "5D"],
      totalCost: 400,
    },
    // Example of a customer with no flights
    {
      customerId: 3,
      departureFlight: null,
      returnFlight: null,
      passengerInfo: null,
      selectedSeats: null,
      totalCost: 0,
    },
  ];

  useEffect(() => {
    // flight data for the current customer
    const customerFlight = flightsData.find(
      (flight) => flight.customerId === customerId
    );

    if (customerFlight && customerFlight.departureFlight) {
      setCustomerFlights(customerFlight); // customer flight details
      setIsFlightBooked(true); // Customer has a flight booked
    } else {
      setIsFlightBooked(false); // No flights booked
    }
  }, [customerId]);

  const handleCancelBooking = () => {
    // index of the customer and update their flight data
    const updatedFlightsData = flightsData.map((flight) =>
      flight.customerId === customerId
        ? {
            ...flight,
            departureFlight: null,
            returnFlight: null,
            passengerInfo: null,
            selectedSeats: null,
            totalCost: 0,
          }
        : flight
    );

    // update the state for customer flights
    const updatedCustomerFlight = updatedFlightsData.find(
      (flight) => flight.customerId === customerId
    );

    setCustomerFlights(updatedCustomerFlight); // Update the UI with canceled flight
    setIsFlightBooked(false); // Set the booking status to false

    // back to the home page after cancellation
    alert("Your booking has been canceled.");
    navigate("/", { state: { user } }); // user object to the home page
  };

  if (!customerId) {
    return <div>Error: No user found.</div>;
  }

  return (
    <div className="view-flights-page">
      <header className="section_container header_container">
        <h1 className="section_header">View Your Flights</h1>
      </header>

      {isFlightBooked ? (
        <div className="flight-summary" style={{ position: "center" }}>
          <h2>
            <span>Flight Details</span>
          </h2>
          <div className="flight-info">
            <h3>Departure Flight</h3>
            <p>
              From: {customerFlights.departureFlight.departureAirport} ({" "}
              {customerFlights.departureFlight.departureDate} )
            </p>
            <p>
              To: {customerFlights.departureFlight.arrivalAirport} ({" "}
              {customerFlights.departureFlight.departureDate} )
            </p>
            <p>Passenger: {customerFlights.passengerInfo.name}</p>
            <p>Seats: {customerFlights.selectedSeats.join(", ")}</p>
            <p>Total Cost: ${customerFlights.totalCost}</p>
          </div>

          <div className="flight-info">
            <h3>Return Flight</h3>
            <p>
              From: {customerFlights.returnFlight.departureAirport} ({" "}
              {customerFlights.returnFlight.departureDate} )
            </p>
            <p>
              To: {customerFlights.returnFlight.arrivalAirport} ({" "}
              {customerFlights.returnFlight.departureDate} )
            </p>
            <p>Passenger: {customerFlights.passengerInfo.name}</p>
            <p>Seats: {customerFlights.selectedSeats.join(", ")}</p>
            <p>Total Cost: ${customerFlights.totalCost}</p>
          </div>

          <button
            className="btn-main-page"
            onClick={handleCancelBooking}
            style={{
              marginTop: "2%",
            }}
          >
            Cancel Booking
          </button>
        </div>
      ) : (
        <div className="no-flights">
          <p
            style={{
              marginTop: "2%",
              marginLeft: "3%",
            }}
          >
            You don't have any flights booked yet.
          </p>
        </div>
      )}
      <button
        className="btn-main-page"
        onClick={handleMainPage}
        style={{
          marginTop: "2%",
          marginLeft: "5%",
        }}
      >
        Return to Main Page
      </button>
    </div>
  );
};

export default ViewFlightsPage;
