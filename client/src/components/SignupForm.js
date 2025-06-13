import React, { useState } from 'react';
import axios from 'axios';
import './styles/AuthPage.css';

const SignupForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    vpa: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-generate VPA from email
      if (name === 'email') {
        const username = value.split('@')[0];
        updated.vpa = username ? `${username}@rupilo` : '';
      }

      return updated;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      setSuccessMessage('Sign up successful, redirecting to login page...');
      setTimeout(() => {
        setLoading(false);
        onSuccess(); // Triggers showLogin = true in App.js
      }, 1000);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Sign Up</h2> */}
      {loading ? (
        <>
          <div className="loader"></div>
          <p>{successMessage}</p>
        </>
      ) : (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
          <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} required />
          <input name="vpa" placeholder="Auto Generated VPA" value={form.vpa} readOnly />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} required />
          <button type="submit">Sign Up</button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
