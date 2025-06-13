// components/UserProfile.js
import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaExchangeAlt, FaScroll } from "react-icons/fa";

import axios from "axios";
import "./styles/UserProfile.css";

const UserProfile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://rupilobackend.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        alert("Could not load profile.");
      }
    };
    fetchProfile();
  }, [token]);

  if (!profile)
    return <p className="rupilo-loading-text">Loading profile...</p>;

  return (
    <div className="main-div-userProfile">
      <div id="user-profile-offset" style={{ marginTop: "-70px", paddingTop: "70px" }}></div>
      <div className="user-layout-wrapper">
        <div className="user-buttons-column">
          <div>Available Services</div>

          <div className="user-button-wrapper">
            <button
              onClick={() =>
                document
                  .getElementById("topup-offset")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaMoneyBillWave style={{ marginRight: "10px" }} /> Top Up
            </button>
            <div className="button-desc">
              Recharge your Rupilo account to add balance
            </div>
          </div>

          <div className="user-button-wrapper">
            <button
              onClick={() =>
                document
                  .getElementById("sendmoney-offset")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaExchangeAlt style={{ marginRight: "10px" }} /> Transfer Money
            </button>
            <div className="button-desc">
              Send money to other Rupilo users instantly
            </div>
          </div>

          <div className="user-button-wrapper">
            <button
              onClick={() =>
                document
                  .getElementById("history-offset")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaScroll style={{ marginRight: "10px" }} /> Transaction History
            </button>
            <div className="button-desc">
              Check all your past transactions here
            </div>
          </div>
        </div>

        <div className="rupilo-profile-container" id="main-user-section">
          <div className="rupilo-profile-header">
            <div className="rupilo-avatar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#0d47a1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                height="32"
                width="32"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
            </div>
            <h2 className="rupilo-profile-title">Your Profile</h2>
          </div>

          <div className="rupilo-profile-details">
            <div className="rupilo-detail-item">
              <i className="feather-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </i>
              <span>
                <strong>Name:</strong> {profile.name}
              </span>
            </div>
            <div className="rupilo-detail-item">
              <i className="feather-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </i>
              <span>
                <strong>Email:</strong> {profile.email}
              </span>
            </div>
            <div className="rupilo-detail-item">
              <i className="feather-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.06 4.24a1 1 0 0 1-.29.95L9.91 11.08a16 16 0 0 0 6 6l2.13-2.13a1 1 0 0 1 .95-.29l4.24 1.06a1 1 0 0 1 .75 1z" />
                </svg>
              </i>
              <span>
                <strong>Phone:</strong> {profile.phone}
              </span>
            </div>
            <div className="rupilo-detail-item">
              <i className="feather-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 8h16" />
                </svg>
              </i>
              <span>
                <strong>VPA:</strong> {profile.vpa}
              </span>
            </div>
            <div className="rupilo-detail-item">
              <i className="feather-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>
              </i>
              <span>
                <strong>Balance:</strong> ₹{profile.balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
