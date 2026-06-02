import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Auth.css"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
const res = await axios.post("https://careercompassbackend.onrender.com/api/auth/login", formData);      
      // Save the token and user data to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate("/instructions"); // Send them to start the assessment
    } catch (err) {
      alert("Login Failed. Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card-split">
        
        {/* LEFT SIDE: Image & Branding */}
        <div className="auth-left">
          <div className="auth-left-header">
            <div className="brand-logo">CareerCompass</div>
          </div>
          
          <div className="auth-left-footer">
            <h2>Welcome back,<br/>Resume your journey.</h2>
            {/* Carousel dots mimicking your image */}
           
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="auth-right">
          <h1>Log in</h1>
          <p className="subtitle">Don't have an account? <Link to="/signup">Create one</Link></p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            
            <input 
              type="email" 
              autoComplete="off"
              className="auth-input"
              placeholder="Email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
            
            <div className="password-container">
              <input 
                type="password" 
                autoComplete="off"
                className="auth-input"
                placeholder="Enter your password" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
            
            {/* Professional Login Row: Remember Me & Forgot Password */}
            <div className="terms-row" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Log in"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;