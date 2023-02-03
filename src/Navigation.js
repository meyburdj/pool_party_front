import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function NavBar({ logout }) {

    const navigate = useNavigate();
    const linkStyle = { textDecoration: "none", color: "white" };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar style={{ "backgroundColor": "black" }}>
                    <Link to="/" style={linkStyle}>
                        <Button color="inherit">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Home
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/login" style={linkStyle}>
                        <Button color="inherit">login</Button>
                    </Link>
                    <Link to="/signup" style={linkStyle}>
                        <Button color="inherit">signup</Button>
                    </Link>
                    {/* <Link to="/logout" style={linkStyle}>
                        <Button color="inherit">logout</Button>
                    </Link> */}
                    <button onClick={() => {
                        logout();
                        navigate("/");
                    }}>
                        logout
                    </button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
