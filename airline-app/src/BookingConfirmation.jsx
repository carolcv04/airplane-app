import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmedPage = () => {

  const navigate = useNavigate();

  /*used chat starting here */
  useEffect(() => { //loads in the booking page for 3 seconds
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000); 
    return () => clearTimeout(timer);
  }, [navigate]);
  /* ending here: utilized to figure out how to have my page only load in for a certain period of time, before
  movng onto the main page*/
  

  return (
    <div className="booking-confirmed-page">
      <header className="section_container header_container"></header>

      <div className="confirmation-message">
        <p>Your booking has been confirmed!</p>
        <p>You will be redirected to the main page shortly...</p>
      </div>

      <div
        className="confirmation-message"
        style={{
          marginTop: "2%",
        }}
      >
        <footer>
          <p>Thank you for booking with us.</p>
        </footer>
      </div>
    </div>
  );
};

export default BookingConfirmedPage;
