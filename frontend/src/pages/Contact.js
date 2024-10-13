import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefult();

    console.log("Message sent: ", { name, email, message });
    alert("Your Message has been Sent!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            reqired
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            reqired
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            type="text"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            reqired
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
