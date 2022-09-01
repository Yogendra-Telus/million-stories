import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Twitter from '../common/Icons/Twitter';
import Insta from '../common/Icons/Insta';
import Youtube from '../common/Icons/Youtube';
import FullLogo from '../common/Icons/MS-Logo';
import ContactModal from '../ContactUs/ContactModal';

const Footer = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };
  return (
    <div className="app-footer">
      <div className="social-links-section">
        <FullLogo iconfill="#ffffff" iconWidth="236" iconHeight="49" className="full-logo" alt="Singleton Logo" />
        <div className="footer-socail-icon">
          <a
            href="https://www.instagram.com/millionstoriesmedia/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Insta iconWidth="24px" iconHeight="24" iconfill="#ffffff" />
          </a>
          <a
            href="https://facebook.com/millionstoriesmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="fab fa-facebook fa" />
          </a>
          <a
            href="https://twitter.com/millionstories"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <Twitter iconWidth="24px" iconHeight="24" iconfill="#ffffff" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCt1LypVFTIQPza66suq00Pw"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link youtube"
          >
            <Youtube iconWidth="24px" iconHeight="24" iconfill="#ffffff" />
          </a>
        </div>
      </div>
      <div className="app-footer-links">
        <Link to="/About">About</Link>
        <Link to="/Partner">Become a Partner</Link>
        <Link to="/Policy">Privacy Policy & TOS</Link>
        <button
          onClick={() => {
            handleContactModal();
          }}
        >
          Contact Us
        </button>
      </div>
      <div className="copy-right">
        A project of{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://singletonfoundation.org/programs/">
          The Singleton Foundation
        </a>
        . &copy; {new Date().getFullYear()} The Singleton Foundation
      </div>
      <ContactModal isContactModalOpen={isContactModalOpen} handleContactModal={handleContactModal} />
    </div>
  );
};

export default Footer;
