import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
        const formData = {username, password};
        const response = await fetch("http://localhost:9001/api/login", {
            method: "POST", // HTTP method
            headers: {
              "Content-Type": "application/json", // Specify JSON data format
            },
            body: JSON.stringify(formData), // Convert data to JSON
          });

          if (response.ok){
            const responseData = await response.json();
            console.log("Response from server:", responseData);
            navigate("/pages/TodoList");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

    } catch (error) {
        console.error("Error during signup:", error.message);
        alert("There was an error during signup. Please try again.");
    }

  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form__container">
        {/* Moved the header inside the form__container */}
        <h1>Login</h1>
        <div className="form__controls">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <button type="submit" className="button">
            Login
          </button>
        </div>
        <div className="text-center">
          <p>
            Do not signup yet account?{" "}
            <Link to="/pages/signup" className="text-decoration-none">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
