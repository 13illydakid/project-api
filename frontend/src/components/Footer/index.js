import React from 'react';
import './Footer.css';
export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="left">
          elleBnB &nbsp;|&nbsp; AirBnB clone &nbsp;
          <span>Billy Chiu</span>
        </div>

        <div className="right">
          <span className="social">
            <a
              href="https://github.com/13illydakid"
              target="blank"
              style={{ textDecoration: 'none' }}
            >
              &nbsp;<i className="fa-brands fa-github"></i>
              &nbsp; 13illydakid &nbsp;
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
