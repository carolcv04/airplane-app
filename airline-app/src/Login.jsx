import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./main.css"; // Assuming your CSS file is still the same

const LoginPage = () => {
  // State hooks for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Process login logic here
    console.log("Logging in with:", username, password);
  };

  // Handle guest login
  const handleGuestLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-page">
      <header className="section_container header_container">
        <h1 className="section_header">Airline App</h1>
      </header>

      <form className="login-page" onSubmit={handleLogin}>
        <h1 className="login-page">Login</h1>
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
