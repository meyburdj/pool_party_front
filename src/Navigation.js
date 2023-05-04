import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "./UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { user } = useContext(userContext);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    logout();
    setIsChecked(false);
    navigate("/");
  }

  return (
    <div className="navbar">
      <h1>
        <Link to="/">Pool Party</Link>
      </h1>
      {user ? (
        <>
          <input type="checkbox" id="menu-toggle" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <label htmlFor="menu-toggle" className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsChecked(false)}>Pools</Link>
            </li>
            <li>
              <Link to="/messages" onClick={() => setIsChecked(false)}>Messages</Link>
            </li>
            <li>
              <Link to="/reservations" onClick={() => setIsChecked(false)}>Reservation</Link>
            </li>
            <li>
              <Link to="/mypools" onClick={() => setIsChecked(false)}>My Pools</Link>
            </li>
            <li>
              <button onClick={handleClick}>Logout</button>
            </li>
          </ul>
        </>
      ) : (
        <>
          <input type="checkbox" id="menu-toggle" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <label htmlFor="menu-toggle" className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>

            </li>
          </ul>
        </>
      )
      }
    </div >
  );
}

export default NavBar;
