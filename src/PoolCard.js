import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Card, CardContent, CardActions, CardMedia, Button, Typography, Modal } from '@mui/material';
import userContext from "./UserContext";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const modalStyle = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };
    function sendMessage(evt) {
        evt.preventDefault();
        //do some api stuff
        handleClose();
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
                {(user?.username !== pool.owner_username) && user &&
                    <CardActions>
                        <Button onClick={handleOpen} size="small">Chat with Host</Button>
                        <Button size="small">Join the Party!</Button>
                    </CardActions>}
                {!user &&
                    <CardActions>
                        <Link to="/login" style={linkStyle}>
                            <Button size="small">Login</Button>
                        </Link>
                        <Link to="/signup" style={linkStyle}>
                            <Button size="small">signup</Button>
                        </Link>
                    </CardActions>}
            </Card>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Contact your future pool party host!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please send a message to your pool party host to start a fun conversation!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="text"
                            type="text"
                            fullWidth
                            variant="standard"
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