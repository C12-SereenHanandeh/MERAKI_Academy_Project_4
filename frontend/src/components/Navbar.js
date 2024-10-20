import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import "../assests/navbar.css";

const Navbar = () => {
  const { user, logout } = useUserContext();

  return (
    <nav className="navbar">
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default Navbar;
