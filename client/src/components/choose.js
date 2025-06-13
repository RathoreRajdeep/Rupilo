// components/choose.js
import React, { useState, useEffect } from "react";
import "./styles/choose.css";
// import logo from "./Images/ggu.png";
import heroImg from "./Images/hero-bg.png";


const choose = () => {
  return (
    <div className="user-hero">
      {/* <img src={logo} alt="Rupilo Logo" className="hero-logo" /> */}
      <div className="hero-left">
        <h1 className="hero-heading">Welcome to Rupilo</h1>
        <p className="hero-subtext">
          {text}
          <span className="caret">|</span>
        </p>
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="Hero" className="hero-image" />
      </div>

      <button
        className="scroll-button"
        onClick={() => {
          const target = document.getElementById("main-user-section");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="scroll-text">Scroll down to use the application</span>
        <span className="scroll-icon">
          <svg
            className="scroll-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 16.5l6-6-1.4-1.4L12 13.7l-4.6-4.6L6 10.5l6 6z" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default choose;
