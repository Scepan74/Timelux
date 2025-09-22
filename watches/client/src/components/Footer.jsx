import React from "react";
import "../css/Footer.css";
import "../css/TestModeBadge.css";
import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaFacebookSquare,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import TestModeBadge from "./TestModeBadge";

//  Footer component
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-upper">
        {/* Contact section */}
        <div className="footer-box">
          <h4>Contact</h4>
          <div className="contact-info">
            <div className="info-line">
              <GoMail />
              <small>
                23 Kei Rd, Emmarentia,
                <br /> Johannesburg, 2195,
                <br /> South Africa
              </small>
            </div>
            <div className="info-line">
              <BsTelephone />
              <small> +27 11 234 5678</small>
            </div>
            <div className="info-line">
              <MdAlternateEmail />
              <small> TimeLux@example.com</small>
            </div>
          </div>
        </div>

        {/* Terms of use section */}
        <div className="footer-box">
          <h4>Terms of use</h4>
          <p>
            Maiores aspernatur aperiam est assumenda magnam dignissimos numquam
            impedit aut libero perspiciatis magni
          </p>
        </div>
        {/* Legal Disclaimer section */}
        <div className="footer-box">
          <h4>Legal Disclaimer</h4>
          <p>
            Maiores aspernatur aperiam est assumenda magnam dignissimos numquam
            impedit aut libero perspiciatis magni
          </p>
        </div>

        {/* Social media section */}
        <div className="footer-box social">
          <FaFacebookSquare className="social-icon" title="Facebook" />
          <FaLinkedin className="social-icon" title="Linkedin" />
          <FaTelegramPlane className="social-icon" title="Telegram" />
          <FaInstagramSquare className="social-icon" title="Instagram" />
        </div>
      </div>
      {/* copyright bar */}
      <div className="footer-bottom">
        <h6>&copy; Web Art Forge {new Date().getFullYear()}</h6>
      </div>
      <TestModeBadge className="footer-badge" />
    </div>
  );
};

export default Footer;
