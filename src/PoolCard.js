import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import userContext from "./UserContext";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PoolPartyApi from "./api";


/**
 * PoolCard: renders an individual pool card.
 *
 * Props:
 * - pool: object for a single pool
 * -addReservation(): prop drilled from App. Adds a reservation and updates user
 * -removeReservation(): prop drilled from App. Removes a reservation and updates user
 *
 * State: 
 * -open: state of message modal
 * -formDataText: message inside message modal
 *
 * Component tree:
 *  PoolCardList -> [PooLCard, PooLCard, ... ]
 */

function PoolCard({ pool, addReservation, removeReservation }) {
  const { user } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [formDataText, setFormDataText] = useState("");

  const linkStyle = { textDecoration: "none", color: "white" };
  const reserveIds = new Set(user?.reservationIds);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /******Message modal related logic start ******/
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormDataText((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function sendMessage(evt) {
    evt.preventDefault();

    const data = {
      body: formDataText.body,
      recipient_username: pool.owner_username,
      listing: pool.id,
    };
    await PoolPartyApi.sendMessage(data);

    handleClose();
  }
  /******Message modal related logic end ******/

  /******Reservation button related logic start ******/
  const reserveData = {
    style: { color: 'green' },
    message: "Join the party!"
  };
  const unReserveData = {
    style: { color: 'red' },
    message: "Leave the party!"
  };

  async function handleReserve(evt) {
    if (!reserveIds.has(pool.id)) {
      try {
        addReservation(pool);

      } catch (err) {
        console.error("Reservation error:", err);
      }
    } else {
      try {
        const reservationId = user.reservations.filter(reservation => reservation.pool_id === pool.id)[0].id;
        await removeReservation(reservationId, pool.id);

      } catch (err) {
        console.error("Delete reservation error:", err);
      }
    }
  }
  /******Reservation button related logic end ******/

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={pool.small_image_url}
          title={pool.small_image_url}
          component="img"
          loading="lazy"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pool.size} pool in {pool.city}
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
            <Button onClick={handleReserve} style={reserveIds.has(pool.id) ? unReserveData.style : reserveData.style} size="small">
              {reserveIds.has(pool.id) ? unReserveData.message : reserveData.message}
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

