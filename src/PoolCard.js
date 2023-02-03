import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import userContext from "./UserContext";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PoolPartyApi from "./api";
// import currency from "currency.js";
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

/**
 * PoolCard: renders an individual pool card.
 *
 * Props:
 * - pool: object for a single pool
 *
 * State: N/A
 *
 * PoolCardList -> [PooLCard, PooLCard, ... ]
 */

function PoolCard({ pool }) {
  const { user } = useContext(userContext);
  const linkStyle = { textDecoration: "none", color: "white" };
  const [open, setOpen] = useState(false);
  const [reserved, setReserved] = useState();
  const [formDataText, setFormDataText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Update form text input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormDataText((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function sendMessage(evt) {
    // console.log("🚀 ~ file: PoolCard.js:45 ~ sendMessage ~ formDataText", {formDataText})
    evt.preventDefault();
    //do some api stuff
    const data = {
      body: formDataText.body,
      recipient_username: pool.owner_username,
      listing: pool.id,
    };

    console.log("🚀 ~ file: PoolCard.js:69 ~ sendMessage ~ data", data)
    await PoolPartyApi.sendMessage(data);

    handleClose();
  }

  function handleReserve(evt) {
    reserved ? setReserved(null) : setReserved({ color: "green" });
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={pool.image_url}
          title={pool.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pool.size.toUpperCase()} pool in {pool.city.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pool.description}
          </Typography>
        </CardContent>
        {user?.username !== pool.owner_username && user && (
          <CardActions>
            <Button onClick={handleOpen} size="small">
              Chat with Host
            </Button>
            <Button onClick={handleReserve} style={reserved} size="small">
              Join the Party!
            </Button>
          </CardActions>
        )}
        {!user && (
          <CardActions>
            <Link to="/login" style={linkStyle}>
              <Button size="small">Login</Button>
            </Link>
            <Link to="/signup" style={linkStyle}>
              <Button size="small">signup</Button>
            </Link>
          </CardActions>
        )}
      </Card>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Contact your future pool party host!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please send a message to your pool party host to start a fun
              conversation!
            </DialogContentText>
            <TextField
              autoFocus
              name="body"
              margin="dense"
              id="name"
              label="text"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={sendMessage}>Send Message!</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default PoolCard;

//TODO: add chat function to onClick button. add reserve function to onclick button
