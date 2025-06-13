// components/HeroSection.js
import React, { useState, useEffect } from "react";
import "./styles/HeroSection.css";
// import logo from "./Images/ggu.png";
import heroImg from "./Images/hero-bg.png";

const messages = [
  "Manage your wallet securely.",
  "Send and receive payments instantly.",
  "Track all your transactions in one place.",
];



const HeroSection = () => {
  const [text, setText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = messages[messageIndex];
    const speed = deleting ? 30 : 60;

    const type = setTimeout(() => {
      setText(current.slice(0, deleting ? charIndex - 1 : charIndex + 1));
      setCharIndex(deleting ? charIndex - 1 : charIndex + 1);

      if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setMessageIndex((messageIndex + 1) % messages.length);
      }
    }, speed);

    return () => clearTimeout(type);
  }, [charIndex, deleting]);

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

export default HeroSection;
