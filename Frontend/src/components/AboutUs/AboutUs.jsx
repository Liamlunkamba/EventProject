import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to the Events Platform, where we believe in the power of
        bringing people together through unforgettable experiences. Our platform
        allows you to discover, participate, and create amazing events that
        inspire and engage communities.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to connect people through events that foster learning,
        innovation, and social impact. Whether you're attending or hosting an
        event, our platform is designed to empower individuals and organizations
        to make meaningful connections.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>Easy to discover events near you.</li>
        <li>Seamless event creation and management tools.</li>
        <li>Foster community engagement and collaboration.</li>
        <li>Access to a wide range of events, from educational to social.</li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        If you have any questions or want to learn more about what we do, feel
        free to <a href="/contact">contact us</a>. We're here to help you make
        the most out of your event experiences!
      </p>
    </div>
  );
};

export default AboutUs;


