import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import userContext from "./UserContext";

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  const navigate = useNavigate();
  const linkStyle = { textDecoration: "none", color: "white" };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "black" }}>
          <Link to="/" style={linkStyle}>
            <Button color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pool Party
              </Typography>
            </Button>
          </Link>
          {/* logged out */}
          {!user && (
            <>
              <Link to="/login" style={linkStyle}>
                <Button color="inherit">login</Button>
              </Link>
              <Link to="/signup" style={linkStyle}>
                <Button color="inherit">signup</Button>
              </Link>
            </>
          )}

          {/* logged in  */}
          {user && (
            <>
              <Link to="/pools" style={linkStyle}>
                <Button color="inherit">pools</Button>
              </Link>
              <Link to="/reservations" style={linkStyle}>
                <Button color="inherit">reservations</Button>
              </Link>
              <Link to="/users" style={linkStyle}>
                <Button color="inherit">users</Button>
              </Link>
              <Link to="/messages" style={linkStyle}>
                <Button color="inherit">messages</Button>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logout
              </button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
