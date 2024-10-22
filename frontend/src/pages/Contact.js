import React, { useState } from "react";
import Navbar from "../components/Navbar";  
import "../assests/contact.css"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    
    console.log("Message sent: ", { name, email, message });
    alert("Your message has been sent!");

    // Clear fields
    setName("");
    setEmail("");
    setMessage("");
    setError(""); // Clear error message
  };

  return (
    <div className="contact">
      <Navbar />
      <h1>Contact Us</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Send us a message</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
