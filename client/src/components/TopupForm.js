import React, { useState } from "react";
import axios from "axios";
import "./styles/TopupForm.css";
const TopupForm = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ⬅️ Add this
      const response = await axios.post(
        "https://rupilobackend.onrender.com/api/topup-requests",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⬅️ Add this
          },
        },
      );
      setMessage(`✅ Request created: ${response.data.status}`);
      setAmount("");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="main-div-top-up">
      <div className="topup-form-container">
        <h2 className="topup-heading">Top-Up Request</h2>
        <form onSubmit={handleSubmit} className="topup-form">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            className="topup-input"
          />
          <button type="submit" className="topup-button">
            Submit
          </button>
        </form>
        {message && <p className="topup-message">{message}</p>}
      </div>
    </div>
  );
};

export default TopupForm;
