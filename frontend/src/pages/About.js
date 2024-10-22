import React from 'react';
import "../assests/about.css";
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer"


const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Your Health, Our Priority</p>
        </div>
      </section>
      
      <section className="about-section mission-section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-description">
            We are committed to delivering world-class healthcare services that meet the highest standards of quality and patient satisfaction.
          </p>
        </div>
      </section>

      <section className="about-section vision-section">
        <div className="container">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-description">
            Our vision is to be a global leader in healthcare by continuously innovating and improving patient care, research, and technology.
          </p>
        </div>
      </section>

      
      <section className="about-section facilities-section">
        <div className="container">
          <h2 className="section-title">Our State-of-the-Art Facilities</h2>
          <p className="section-description">
            From advanced medical equipment to modern patient care rooms, we ensure the highest standards in healthcare facilities.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description">
            For more information or to schedule an appointment, call us at (123) 456-7890 or visit us at [Address].
          </p>
          <a href="/contact" className="btn btn-primary">Get in Touch</a>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUs;
