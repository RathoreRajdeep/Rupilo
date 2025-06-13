// components/SendMoneyForm.js
import React, { useState } from "react";
import axios from "axios";
import "./styles/SendMoneyForm.css";
const SendMoneyForm = ({ token }) => {
  const [form, setForm] = useState({
    vpa: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const res = await axios.post(
        "https://rupilobackend.onrender.com/api/payments/send",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert(res.data.message || "Payment sent successfully!");
      setForm({ vpa: "", amount: "", description: "" }); // reset
    } catch (err) {
      console.error("Payment Error:", err.response || err.message || err);
      alert(err.response?.data?.message || "Failed to send payment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="send-money-form">
      <h2>Send Money</h2>
      <input
        name="vpa"
        placeholder="Recipient VPA"
        value={form.vpa}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMoneyForm;
