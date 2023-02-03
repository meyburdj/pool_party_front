import userContext from "./UserContext";
import PoolPartyApi from "./api";
import React, { useState, useContext, useEffect } from "react";

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

function MailBox() {
    const { user } = useContext(userContext);
    const [messages, setMessages] = useState({
        data: null,
        isLoading: true,
    });

    useEffect(function getMessagesOnMount() {
        getMessages();
    }, []);

    async function getMessages() {
        console.log("Im in getmessages");
        const response = await PoolPartyApi.getMessages();
        console.log("response from mailbox", response);
        setMessages({
            data: response,
            isLoading: false,
        });
    }

    console.log(messages);

    return (
        <>
            <h4>Outbox</h4>
            {(messages.data) && messages.data.outbox.map(message => (
                <div key={message.id}>
                    <br />
                    <p>sender: {message.sender_username}</p>
                    <p>recepient: {message.recipient_username}</p>
                    <p>message body</p>
                    <p>{message.body}</p>
                    <p>pool listing: {message.listing}</p>
                    <p>message timestamp: {message.timestamp}</p>
                </div>

            ))}
            <h4>Inbox</h4>
            {/* {messages.data.map(message => )} */}
        </>

    );
}

export default MailBox;

  //TODO: add chat function to onClick button. add reserve function to onclick button
