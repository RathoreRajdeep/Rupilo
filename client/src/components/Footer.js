import React from "react";
import "./styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Rupilo is your trusted digital wallet solution. Seamlessly top-up,
            transfer, and manage your funds with ease and security.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => scrollToSection("main-user-section")}>Profile</li>
            <li onClick={() => scrollToSection("topup-offset")}>Top Up</li>
            <li onClick={() => scrollToSection("topup-offset")}>Transfer Money</li>
            <li onClick={() => scrollToSection("history-offset")}>Transaction History</li>
          </ul>
        </div>

        <div className="footer-section connect-us">
          <h3>Connect with Us</h3>
          <ul>
            <li>
              <FaGithub />
              <a
                href="https://github.com/RathoreRajdeep"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/rajdeep-singh-rathore"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <FaEnvelope />
              <a href="mailto:rajdeeprathore92@gmail.com">Mail</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
            ✨ Code whispers behind the pixels – <strong>
              <a
                href="https://instagram.com/rajdeep._.rathore"
                target="_blank"
                rel="noreferrer"
                className="footer-rajdeep"
              >
                RAJDEEP
           </a>
           </strong>
         </p>
     </div>

    </footer>
  );
};

export default Footer;
