import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./main.css"; // Assuming your CSS file is still the same

const LoginPage = () => {
  // State hooks for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();

  // Hardcoded list of users with more details (userId, username, email, etc.)
  const users = [
    {
      userId: 1,
      username: "admin",
      password: "admin123",
      email: "admin@airline.com",
    },
    {
      userId: 2,
      username: "user1",
      password: "password1",
      email: "user1@airline.com",
    },
    {
      userId: 3,
      username: "guest",
      password: "guest123",
      email: "guest@airline.com",
    },
  ];

  // Handle login form submission

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if username and password match any user in the list
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      // If credentials are correct, navigate to the main page and pass the entire user object
      navigate("/", {
        state: { user: foundUser }, // Pass the entire user object to the MainPage
      });
    } else {
      // If credentials are incorrect, show error message
      setError("Invalid username or password");
    }
=======

  const navigate = useNavigate();
  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Process login logic here
    console.log("Logging in with:", username, password);
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
  };

  // Handle guest login
  const handleGuestLogin = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setPassword(null);
    setUsername(null);
=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
    navigate("/");
  };

  return (
    <div className="login-page">
      <header className="section_container header_container">
        <h1 className="section_header">Airline App</h1>
      </header>

      <form className="login-page" onSubmit={handleLogin}>
        <h1 className="login-page">Login</h1>
<<<<<<< HEAD

        {/* Display error message if invalid login */}
        {error && <div className="error-message">{error}</div>}

=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
        <div className="textBox-login-page">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
        </div>
<<<<<<< HEAD

=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
        <div className="textBox-login-page">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
<<<<<<< HEAD

=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
        <input type="submit" value="Login" className="loginBtn-login-page" />

        <div className="signUp-login-page">
          Don't have an account? <br />
          <a href="#">Sign up</a>
        </div>

        <h2>
          <span>or</span>
        </h2>
<<<<<<< HEAD

=======
>>>>>>> 951cc9101c7388f1dc16b51efd42f212e987bf1a
        <input
          type="submit"
          value="Continue as a Guest"
          className="guest-login-page"
          onClick={handleGuestLogin}
        />
      </form>
    </div>
  );
};

export default LoginPage;
