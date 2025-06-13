import React, { useState } from 'react';
import axios from 'axios';

import './styles/AuthPage.css';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      onLogin(); // Call parent function to update loggedIn state
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Log In</h2> */}
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} required />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
