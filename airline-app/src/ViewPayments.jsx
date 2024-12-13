import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewPaymentsPage = () => {
  // State to hold customer payment data
  const [customerPayment, setCustomerPayment] = useState(null);
  const [isPaymentMade, setIsPaymentMade] = useState(false);
  const [newPayment, setNewPayment] = useState({
    paymentMethod: "",
    cardNumber: "", // Add cardNumber field
    expirationDate: "", // Add expirationDate field
  });
  const [showForm, setShowForm] = useState(false); // Track form visibility

  // Get the customer data passed through state (customerId)
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || {}; // Get the user object passed from MainPage or LoginPage
  const customerId = user ? user.userId : null; // Get customerId from the logged-in user

  const handleMainPage = () => {
    navigate("/", { state: { user } });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  // Hardcoded payment data for each customer
  const paymentData = [
    {
      customerId: 1,
      totalFlyerPoints: 1500,
      paymentInfo: {
        paymentMethod: "Credit Card",
        cardNumber: "6789 7890 7890 7809",
        expirationDate: "2024-12-10",
      },
    },
    {
      customerId: 2,
      totalFlyerPoints: 1200,
      paymentInfo: {
        paymentMethod: "Credit Card",
        cardNumber: "6789 7890 7890 7809",
        expirationDate: "2024-12-12",
      },
    },
    // Example of a customer with no payments
    {
      customerId: 3,
      totalFlyerPoints: 0,
      paymentInfo: null,
    },
  ];

  useEffect(() => {
    // Find the payment data for the current customer
    const customerPaymentData = paymentData.find(
      (payment) => payment.customerId === customerId
    );

    if (customerPaymentData && customerPaymentData.paymentInfo) {
      setCustomerPayment(customerPaymentData); // Set customer payment details
      setIsPaymentMade(true); // Customer has made a payment
    } else {
      setIsPaymentMade(false); // No payment made
    }
  }, [customerId]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddPayment = () => {
    // Validation
    if (
      !newPayment.paymentMethod ||
      !newPayment.cardNumber ||
      !newPayment.expirationDate
    ) {
      alert("Please fill in all payment details.");
      return;
    }

    // Here, we would update the payment data in a real application
    // For now, just simulate adding the new payment
    const updatedPaymentData = paymentData.map((payment) =>
      payment.customerId === customerId
        ? {
            ...payment,
            totalFlyerPoints: payment.totalFlyerPoints + 100, // Add points for new payment
            paymentInfo: newPayment, // Save the new payment info
          }
        : payment
    );

    // Find the updated customer payment details
    const updatedCustomerPayment = updatedPaymentData.find(
      (payment) => payment.customerId === customerId
    );

    setCustomerPayment(updatedCustomerPayment); // Update the UI with new payment
    setIsPaymentMade(true); // Set the payment status to true

    // Clear the form
    setNewPayment({
      paymentMethod: "",
      cardNumber: "",
      expirationDate: "",
    });
    setShowForm(false); // Hide the form after submission
  };

  const handleRemovePayment = () => {
    // Remove payment information and update state
    const updatedPaymentData = paymentData.map((payment) =>
      payment.customerId === customerId
        ? {
            ...payment,
            paymentInfo: null, // Remove payment info
            totalFlyerPoints: payment.totalFlyerPoints - 100, // Remove points for removed payment
          }
        : payment
    );

    // Find the updated customer payment details
    const updatedCustomerPayment = updatedPaymentData.find(
      (payment) => payment.customerId === customerId
    );

    // Update state to reflect removal of payment
    setCustomerPayment(updatedCustomerPayment);
    setIsPaymentMade(false); // Set isPaymentMade to false since no payment exists

    // Optionally, you can show a message or feedback
    alert("Payment removed successfully.");
  };

  if (!customerId) {
    return <div>Error: No user found.</div>;
  }

  return (
    <div className="view-payments-page">
      <header className="section_container header_container">
        <h1 className="section_header">View Your Payments</h1>
      </header>

      {isPaymentMade ? (
        <div className="flight-summary">
          <h2>
            <span>Payment Details</span>
          </h2>

          <div className="payment-info">
            <h3>Total Flyer Points</h3>
            <p>{customerPayment.totalFlyerPoints} points</p>
          </div>

          <div className="payment-info">
            <h3>Payment Information</h3>
            <p>Payment Method: {customerPayment.paymentInfo.paymentMethod}</p>
            <p>Payment Number: {customerPayment.paymentInfo.cardNumber}</p>
            <p>
              Payment Expiration: {customerPayment.paymentInfo.expirationDate}
            </p>
            <button
              className="btn-main-page"
              style={{
                marginTop: "2%",
              }}
              onClick={handleRemovePayment} // Call remove function on click
            >
              Remove Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="no-payments">
          <p
            style={{
              marginTop: "2%",
              marginLeft: "2%",
            }}
          >
            You don't have any payments recorded yet.
          </p>
        </div>
      )}

      {/* Button to toggle the payment form */}
      <button
        className="btn-main-page"
        onClick={handleShowForm}
        style={{
          marginTop: "2%",
          marginLeft: "3%",
        }}
      >
        Add New Payment
      </button>

      {/* Payment Form */}
      {showForm && (
        <div className="flight-summary">
          <h3>Add Payment Information</h3>
          <form
            className="passenger"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleAddPayment(); // Call the payment handler
            }}
          >
            <div className="input-group">
              <label>
                Payment Method:
                <input
                  type="text"
                  name="paymentMethod"
                  value={newPayment.paymentMethod}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
            </div>

            {/* Credit Card Specific Fields */}
            <div className="input-group">
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={newPayment.cardNumber}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
            </div>

            <div className="input-group">
              <label>
                Expiration Date:
                <input
                  type="date"
                  name="expirationDate"
                  value={newPayment.expirationDate}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
            </div>

            <button
              type="button"
              className="btn-main-page"
              onClick={handleAddPayment}
              style={{
                marginTop: "3%",
              }}
            >
              Submit Payment
            </button>
          </form>
        </div>
      )}

      <button
        className="btn-main-page"
        onClick={handleMainPage}
        style={{
          marginTop: "2%",
          marginLeft: "3%",
        }}
      >
        Return to Main Page
      </button>
    </div>
  );
};

export default ViewPaymentsPage;
