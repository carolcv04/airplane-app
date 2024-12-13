import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./main.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // state for error message

  const navigate = useNavigate();

  //hardcoded data
  const users = [
    {
      userId: 1,
      username: "joe",
      password: "joe123",
      email: "joe@airline.com",
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

  // handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // check if username and password match any user in the list
    /* used chatgbt here */
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      navigate("/", {
        state: { user: foundUser }, // pass the entire user object to the MainPage
      });
    } else {
      setError("Invalid username or password");
    }
  };
  /* used until here: utilized it to understand how to validate user username & password */

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
            /* used chatgbt here */
            onChange={(e) => setUsername(e.target.value)} // update username state
            /* used unitl here: utilized to set username state */

          />
        </div>
        <div className="textBox-login-page">
          <input
            type="password"
            placeholder="Password"
            value={password}
            /* used chatgbt here */
            onChange={(e) => setPassword(e.target.value)} // update password state
            /* used unitl here: utilized to set username state */
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
