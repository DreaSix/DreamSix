import React from 'react';
import '../styles/Login.scss'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="login-btn" type="submit">Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
