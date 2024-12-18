import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import "./main.css"; // Assuming your CSS file is still the same
import headerImage from "./assets/header.png";
import "remixicon/fonts/remixicon.css"; // Path relative to the current file
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

const MainPage = () => {

  // conditionals & variables
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [destinationDate, setDestinationDate] = useState("");
  const [travellers, setTravellers] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // state to store the user object

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); 
  const locationState = useLocation(); // get the state from the location (from the login page)

  useEffect(() => {
    if (locationState.state?.user) {
      setUser(locationState.state.user);
      setIsUserLoggedIn(true); // mark the user as logged in
    }
  }, [locationState]);

  /* refrenced geeks for geeks */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  /* until here */

  const handleLogIn = () => {
    navigate("/login"); // pass to the login page
  };

  const handleViewFlights = () => {
    navigate("/view-flights", {
      state: { user }, // pass the user object
    });
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setUser(null);
  };

  const handleViewPayments = () => {
    navigate("/view-payments", {
      state: { user }, // pass the user object
    });
  };

  // handle form submission
  /* used chatgbt here */
  const handleSearch = (e) => {
    e.preventDefault();

    const formData = {
      location,
      destination,
      departureDate,
      destinationDate,
      travellers,
    };

    navigate("/book-depart", {
      state: formData,
    });
  };
  /* until here: to understand how to share the information with the booking depart page */

  return (
    /* followed a youtube tutorial: link: https://www.youtube.com/watch?v=7pt3gfJ37S8 */
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

        {isUserLoggedIn && user && (
          <div
          /* refrenced geeks for geeks */
          >
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Menu
            </Button>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={handleClose}>My Account</MenuItem>
              <MenuItem onClick={handleViewPayments}>View Payments</MenuItem>
              <MenuItem onClick={handleViewFlights}>View Flights</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
          /* until here: utilized it to figure out how to make a user menu */

        )}

        {!isUserLoggedIn && (
          <button className="btn-main-page" onClick={handleLogIn}>
            Log In
          </button>
        )}
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
                  onChange={(e) => setLocation(e.target.value)} // update location state
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
                  onChange={(e) => setDestination(e.target.value)} // update destination state
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
                  onChange={(e) => setDepartureDate(e.target.value)} // update departureDate state
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
                  onChange={(e) => setDestinationDate(e.target.value)} // update destination state
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
                  onChange={(e) => setTravellers(e.target.value)} // update travellers state
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
    /* until here */
  );
};

export default MainPage;
