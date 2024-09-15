import React from 'react';
import '../styles/About.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          We are a <span className="highlight">leading company</span> in our field, offering the best solutions to our clients.
        </p>
        <p>
          Our mission is to provide top-quality services and products to our customers, ensuring their utmost satisfaction.
        </p>
      </div>
    </div>
  );
};

export default About;
