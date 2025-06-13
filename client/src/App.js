import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import TopupForm from "./components/TopupForm";
import TopupRequestsList from "./components/TopupRequestsList";
import SendMoneyForm from "./components/SendMoneyForm";
import UserProfile from "./components/UserProfile";
import AdminUserList from "./components/AdminUserList";
import TransactionHistory from "./components/TransactionHistory";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LiveClock from "./components/LiveClock";
import MotivationBanner from "./components/MotivationBanner";

import { FaUser } from "react-icons/fa";
import { FaTools } from "react-icons/fa";


import "./components/styles/AuthPage.css";
import "./components/styles/User.css";
import "./components/styles/UserProfile.css";
import "./App.css";

import logo from "./components/Images/logo.png";
import choose from "./components/Images/choose.png";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showLogin, setShowLogin] = useState(false); // Toggle between signup and login
  const [userName, setUserName] = useState("");
  const [adminViewChoice, setAdminViewChoice] = useState(null); // null | 'admin' | 'user'

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoggedIn(true);
        setIsAdmin(decoded.isAdmin);
        setUserEmail(decoded.email);
        setUserName(decoded.name);
      } catch (e) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setIsAdmin(false);
    setUserEmail("");
    setShowLogin(false);
    setUserName("");
    setAdminViewChoice(null);
  };

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedIn(true);
      setIsAdmin(decoded.isAdmin);
      setUserEmail(decoded.email);
      setUserName(decoded.name);
    }
  };

  return (
    <div className="forbackground">
      <a href="https://rupilo.onrender.com" target="_blank" rel="noopener noreferrer">
  <img src={logo} alt="Rupilo Logo" className="hero-logo" />
</a>

      {/* <h1>Welcome to Rupilo</h1> */}
      {loggedIn ? (
        <>
          <div className="topbackground"></div>
          {isAdmin && adminViewChoice === null ? (
            <div className="admin-choice-layout">
              <div className="admin-choice-left-image">
                <img src={choose} alt="Admin Choice Illustration" />
              </div>

              <div className="admin-choice-right-content">
                <h2>Welcome back, Admin!</h2>
                <p className="admin-subtitle">How do you want to proceed?</p>

                <div className="admin-button-block">
                  <button className="admin-btn" onClick={() => setAdminViewChoice("admin")}>
                    <FaTools style={{ color: "white", marginRight: "8px" }} /> As Admin
                  </button>
                  <div className="button-description">
                    <p>
                      Manage all top-up requests and user data across the
                      platform.
                    </p>
                  </div>
                </div>

                <div className="admin-button-block">
                  <button className="admin-btn" onClick={() => setAdminViewChoice("user")}>
                    <FaUser style={{ color: "white", marginRight: "8px" }} /> As User
                  </button>
                  <div className="button-description">
                    <p>
                      Access your personal dashboard to send money and view
                      activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : isAdmin && adminViewChoice === "admin" ? (
            <>
              <LiveClock/>
              <MotivationBanner/>
              <TopupRequestsList />
              <AdminUserList token={localStorage.getItem("token")} />
            </>
          ) : (
            <>
              <div className="bgsetfromapp">
                <HeroSection />
                <div className="user-section">
                    <UserProfile token={localStorage.getItem("token")} />
                </div>
                <div className="features-user-row">
                  <div id="sendmoney-offset" ></div>
                  <div className="user-section" id="transfer-section">
                    <SendMoneyForm token={localStorage.getItem("token")} />
                  </div>
                  <div id="topup-offset" ></div>
                  <div className="user-section" id="topup-section">
                    <TopupForm />
                  </div>
                </div>
                <div id="history-offset" style={{ marginTop: "-70px", paddingTop: "70px" }}></div>
                <div className="user-section" id="history-section">
                  <TransactionHistory token={localStorage.getItem("token")} />
                </div>
                <Footer />
              </div>
            </>
          )}

          <div className="user-greeting">
            <p>
              <strong>Hello, {userName?.split(" ")[0] || "User"}</strong>
            </p>

            {!(isAdmin && adminViewChoice === "admin") && (
  <button
    className="view-profile-btn"
    onClick={() => {
      const section = document.getElementById("user-profile-offset");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }}
  >
    <span className="profile-icon-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#0d47a1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        height="16"
        width="16"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    </span>
    Profile
  </button>
)}


            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className="auth-container">
            <div className="auth-form-wrapper">
              <h1>Welcome to Rupilo</h1>

              {/* Toggle Buttons */}
              <div className="toggle-button-group">
                <button
                  className={`toggle-button-pill ${!showLogin ? "active" : "inactive"}`}
                  onClick={() => setShowLogin(false)}
                >
                  Sign up
                </button>
                <button
                  className={`toggle-button-pill ${showLogin ? "active" : "inactive"}`}
                  onClick={() => setShowLogin(true)}
                >
                  Log in
                </button>
              </div>

              {/* Conditional Form */}
              {showLogin ? (
                <LoginForm onLogin={handleLoginSuccess} />
              ) : (
                <SignupForm onSuccess={() => setShowLogin(true)} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
