import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./main.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();

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
      navigate("/", {
        state: { user: foundUser }, // Pass the entire user object to the MainPage
      });
    } else {
      setError("Invalid username or password");
    }
  };

  // Handle guest login
  const handleGuestLogin = (e) => {
    e.preventDefault();
    setPassword(null);
    setUsername(null);
    navigate("/");
  };

  return (
    <div className="login-page">
      <header className="section_container header_container">
        <h1 className="section_header">Airline App</h1>
      </header>

      <form className="login-page" onSubmit={handleLogin}>
        <h1 className="login-page">Login</h1>

        {/* Display error message if invalid login */}
        {error && <div className="error-message">{error}</div>}

        <div className="textBox-login-page">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
        </div>
        <div className="textBox-login-page">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        <input type="submit" value="Login" className="loginBtn-login-page" />

        <div className="signUp-login-page">
          Don't have an account? <br />
          <a href="#">Sign up</a>
        </div>

        <h2>
          <span>or</span>
        </h2>
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
