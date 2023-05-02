// import React from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useContext } from "react";
// import userContext from "./UserContext";

// function NavBar({ logout }) {
//   const { user } = useContext(userContext);

//   const navigate = useNavigate();
//   const linkStyle = { textDecoration: "none", color: "white" };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar style={{ backgroundColor: "black" }}>
//           <Link to="/" style={linkStyle}>
//             <Button color="inherit">
//               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 Pool Party
//               </Typography>
//             </Button>
//           </Link>
//           {/* logged out */}
//           {!user && (
//             <>
//               <Link to="/login" style={linkStyle}>
//                 <Button color="inherit">login</Button>
//               </Link>
//               <Link to="/signup" style={linkStyle}>
//                 <Button color="inherit">signup</Button>
//               </Link>
//             </>
//           )}

//           {/* logged in  */}
//           {user && (
//             <>
//               <Link to="/pools" style={linkStyle}>
//                 <Button color="inherit">pools</Button>
//               </Link>
//               <Link to="/reservations" style={linkStyle}>
//                 <Button color="inherit">reservations</Button>
//               </Link>
//               <Link to="/users" style={linkStyle}>
//                 <Button color="inherit">users</Button>
//               </Link>
//               <Link to="/messages" style={linkStyle}>
//                 <Button color="inherit">messages</Button>
//               </Link>
//               <Link to="/mypools" style={linkStyle}>
//                 <Button color="inherit">mypools</Button>
//               </Link>

//               <button
//                 onClick={() => {
//                   logout();
//                   navigate("/");
//                 }}
//               >
//                 logout
//               </button>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default NavBar;

// import React from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useContext } from "react";
// import userContext from "./UserContext";
// import "./NavBar.css";

// function NavBar({ logout }) {
//   const { user } = useContext(userContext);

//   const navigate = useNavigate();
//   const linkStyle = { textDecoration: "none", color: "white" };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar className="toolbar" style={{ backgroundColor: "black" }}>
//           <Link to="/" style={linkStyle}>
//             <Button className="navButton" color="inherit">
//               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 Pool Party
//               </Typography>
//             </Button>
//           </Link>
//           <div className="buttonContainer">
//             {/* logged out */}
//             {!user && (
//               <>
//                 <Link to="/login" style={linkStyle}>
//                   <Button className="navButton" color="inherit">login</Button>
//                 </Link>
//                 <Link to="/signup" style={linkStyle}>
//                   <Button className="navButton" color="inherit">signup</Button>
//                 </Link>
//               </>
//             )}

//             {/* logged in  */}
//             {user && (
//               <>
//                 <Link to="/pools" style={linkStyle}>
//                   <Button className="navButton" color="inherit">pools</Button>
//                 </Link>
//                 <Link to="/reservations" style={linkStyle}>
//                   <Button className="navButton" color="inherit">reservations</Button>
//                 </Link>
//                 <Link to="/users" style={linkStyle}>
//                   <Button className="navButton" color="inherit">users</Button>
//                 </Link>
//                 <Link to="/messages" style={linkStyle}>
//                   <Button className="navButton" color="inherit">messages</Button>
//                 </Link>
//                 <Link to="/mypools" style={linkStyle}>
//                   <Button className="navButton" color="inherit">mypools</Button>
//                 </Link>

//                 <button
//                   className="navButton"
//                   onClick={() => {
//                     logout();
//                     navigate("/");
//                   }}
//                 >
//                   logout
//                 </button>
//               </>
//             )}
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default NavBar;

import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import userContext from "./UserContext";
import "./NavBar.css";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  const navigate = useNavigate();
  const linkStyle = { textDecoration: "none", color: "white" };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <List>
      {!user && (
        <>
          <Link to="/login" style={linkStyle}>
            <ListItem button>Login</ListItem>
          </Link>
          <Link to="/signup" style={linkStyle}>
            <ListItem button>Signup</ListItem>
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to="/pools" style={linkStyle}>
            <ListItem button>Pools</ListItem>
          </Link>
          <Link to="/reservations" style={linkStyle}>
            <ListItem button>Reservations</ListItem>
          </Link>
          <Link to="/users" style={linkStyle}>
            <ListItem button>Users</ListItem>
          </Link>
          <Link to="/messages" style={linkStyle}>
            <ListItem button>Messages</ListItem>
          </Link>
          <Link to="/mypools" style={linkStyle}>
            <ListItem button>My Pools</ListItem>
          </Link>
          <ListItem
            button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="toolbar" style={{ backgroundColor: "black" }}>
          <Link to="/" style={linkStyle}>
            <Button className="navButton" color="inherit">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pool Party
              </Typography>
            </Button>
          </Link>
          <div className="buttonContainer">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className="hamburgerMenu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
``;
