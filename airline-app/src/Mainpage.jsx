import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./main.css"; // Assuming your CSS file is still the same
import headerImage from "./assets/header.png";
import "remixicon/fonts/remixicon.css"; // Path relative to the current file

const MainPage = () => {
  // State hooks for form fields
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [destinationDate, setDestinationDate] = useState("");
  const [travellers, setTravellers] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogIn = () => {
    // Navigate back to the home page or main page (adjust the path as needed)
    navigate("/login");
  };
  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      location,
      destination,
      departureDate,
      destinationDate,
      travellers,
    };

    // Navigate to the BookingDepartPage and pass form data using state
    navigate("/book-depart", {
      state: formData, // Pass the form data to the next page
    });
  };

  return (
    <div className="main-page">
      <nav>
        <div className="app_logo">Airplane App</div>
        <ul className="app_links">
          <li className="link">
            <a href="#">Home</a>
          </li>
          <li className="link">
            <a href="#">About</a>
          </li>
          <li className="link">
            <a href="#">Offers</a>
          </li>
          <li className="link">
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="btn-main-page" onClick={handleLogIn}>
          Log In
        </button>
      </nav>

      <header className="section_container header_container">
        <h1 className="section_header">
          Find And Book
          <br />A Great Experience
        </h1>
        <br />
        <img src={headerImage} alt="header" />
      </header>

      <section className="section_container booking_container">
        <div className="booking_nav">
          <span>Economy Class</span>
          <span>Business Class</span>
          <span>First Class</span>
        </div>

        <form onSubmit={handleSearch}>
          <div className="form_group">
            <span>
              <i className="ri-map-pin-2-line"></i>
            </span>
            <div className="input_content">
              <div className="input_group">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Update location state
                />
                <label>Location</label>
              </div>
              <p>Departure Airport</p>
            </div>
          </div>

          <div className="form_group">
            <span>
              <i className="ri-user-line"></i>
            </span>
            <div className="input_content">
              <div className="input_group">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)} // Update destination state
                />
                <label>Destination</label>
              </div>
              <p>Destination Airport</p>
            </div>
          </div>

          <div className="form_group">
            <span>
              <i className="ri-flight-takeoff-line"></i>
            </span>
            <div className="input_content">
              <div className="input_group">
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)} // Update departureDate state
                />
                <label>Departure</label>
              </div>
              <p>Departure Date</p>
            </div>
          </div>

          <div className="form_group">
            <span>
              <i className="ri-flight-land-line"></i>
            </span>
            <div className="input_content">
              <div className="input_group">
                <input
                  type="date"
                  value={destinationDate}
                  onChange={(e) => setDestinationDate(e.target.value)} // Update destination state
                />
                <label>Destination</label>
              </div>
              <p>Destination Date</p>
            </div>
          </div>

          <div className="form_group">
            <span>
              <i className="ri-flight-land-line"></i>
            </span>
            <div className="input_content">
              <div className="input_group">
                <input
                  type="number"
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)} // Update travellers state
                />
                <label>Travellers</label>
              </div>
              <p>Amount of Travellers</p>
            </div>
          </div>

          <button type="submit" className="search-main-page">
            <p>Search</p>
          </button>
        </form>
      </section>
    </div>
  );
};

export default MainPage;
