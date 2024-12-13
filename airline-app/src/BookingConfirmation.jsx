import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000); // 5 seconds delay
    return () => clearTimeout(timer);
  }, [navigate]);

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
