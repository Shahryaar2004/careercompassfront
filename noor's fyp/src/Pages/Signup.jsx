import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/Auth.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const submissionData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    };

    try {
      await axios.post('https://careercompassbackend-1.onrender.com/signup', submissionData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card-split">
        
        <div className="auth-left">
          <div className="auth-left-header">
            <div className="brand-logo">CareerCompass</div>
          </div>
          
          <div className="auth-left-footer">
            <h2>Charting paths,<br/>Creating futures.</h2>
          </div>
        </div>

        <div className="auth-right">
          <h1>Create an account</h1>
          <p className="subtitle">Already have an account? <Link to="/">Log in</Link></p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="name-row">
              <input 
                type="text" 
                className="auth-input"
                autoComplete="off"
                placeholder="First name" 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                className="auth-input"
                autoComplete="off"
                placeholder="Last name" 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                required 
              />
            </div>
            
            <input 
              type="email" 
              className="auth-input"
              autoComplete="off"
              placeholder="Email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
            
            <div className="password-container">
              <input 
                type="password" 
                className="auth-input"
                placeholder="Enter your password" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Processing..." : "Create account"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;