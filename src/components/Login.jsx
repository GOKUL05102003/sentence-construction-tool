import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css"; // External CSS

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "gokul@camonk.com" && password === "camonk123") {
      navigate("/start");
    } else {
      alert("Invalid credentials. Use gokul@camonk.com / camonk123");
    }
  };

  return (
    <div className="auth-container login-bg">
      <div className="auth-box fade-in">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>
        </p>
        <p className="demo-info">
          <strong>Demo:</strong> gokul@camonk.com / camonk123
        </p>
      </div>
    </div>
  );
}

export default Login;
