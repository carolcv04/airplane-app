import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewPaymentsPage = () => {
  //conditionals & variables
  const [customerPayment, setCustomerPayment] = useState(null);
  const [isPaymentMade, setIsPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    paymentMethod: "",
    cardNumber: "", 
    expirationDate: "",
  });
  const [showForm, setShowForm] = useState(false); // Track form visibility

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || {}; //  user object passed from mainpage
  const customerId = user ? user.userId : null; // customerid from the user

  const handleMainPage = () => {
    navigate("/", { state: { user } });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  // hardcoded payment data for each customer
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
    {
      customerId: 3,
      totalFlyerPoints: 0,
      paymentInfo: null,
    },
  ];

  useEffect(() => {
    // find the payment data for the current customer
    const customerPaymentData = paymentData.find(
      (payment) => payment.customerId === customerId
    );

    if (customerPaymentData && customerPaymentData.paymentInfo) {
      setCustomerPayment(customerPaymentData); // set customer payment details
      setIsPayment(true);
    } else {
      setIsPaymentMade(false); //no payments
    }
  }, [customerId]);

  /* used chat gbt here */
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  /* used until here: utilized it to understand how to update the correct value */

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

    //simulate adding the new payment
    /* used chat gbt here */
    const updatedPaymentData = paymentData.map((payment) =>
      payment.customerId === customerId
        ? {
            ...payment,
            totalFlyerPoints: payment.totalFlyerPoints,
            paymentInfo: newPayment, // save new info
          }
        : payment
    );
    /* used until here: utilized it to understand how to update new payment data */


    // find the updated customer payment info
    const updatedCustomerPayment = updatedPaymentData.find(
      (payment) => payment.customerId === customerId
    );

    setCustomerPayment(updatedCustomerPayment); 
    setIsPayment(true); 

    // clear & hide the from
    setNewPayment({
      paymentMethod: "",
      cardNumber: "",
      expirationDate: "",
    });
    setShowForm(false); 
  };

  /* used chatgbt here */
  const handleRemovePayment = () => {
    // remove payment information and update state
    const updatedPaymentData = paymentData.map((payment) =>
      payment.customerId === customerId
        ? {
            ...payment,
            paymentInfo: null,
            totalFlyerPoints: payment.totalFlyerPoints, 
          }
        : payment
    );
    /* used until here: utilized it to understand how to remove payment information*/

    // find the updated customer payment options
    const updatedCustomerPayment = updatedPaymentData.find(
      (payment) => payment.customerId === customerId
    );

    setCustomerPayment(updatedCustomerPayment);
    setIsPaymentMade(false); 
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
              {/*used chat here */}
              e.preventDefault();
              handleAddPayment(); // call the payment handler
            }}
             /* used unil here: utilized it to understand how to hook up add payment  */
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
