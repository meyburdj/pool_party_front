import userContext from "./UserContext";
import PoolPartyApi from "./api";
import React, { useState, useContext, useEffect } from "react";
import { LinearProgress } from "@mui/material";

function MailBox() {
    const { user } = useContext(userContext);
    const [messages, setMessages] = useState({
        data: null,
        isLoading: true,
    });

    const [inbox, setInbox] = useState({
        data: null,
    });

    const [outbox, setOutbox] = useState({
        data: null,
    });

    useEffect(function getMessagesAndSortContacts() {
        async function fetchData() {
            const response = await PoolPartyApi.getMessages();
            console.log(response);
            setMessages({
                data: response,
                isLoading: false,
            });
            console.log(response.inbox);
            const sortedInbox = sortContactsBasedOnMessages(response.inbox);
            const sortedOutbox = sortContactsBasedOnMessages(response.outbox);
            setInbox(sortedInbox);
            setOutbox(sortedOutbox);

        }

        fetchData();
    }, []);
    console.log(inbox, outbox);
    function sortContactsBasedOnMessages(messages) {
        let contacts = new Set();

        for (const message of messages) {
            message.sender_username === user ?
                contacts.add(message.recipient_username) :
                contacts.add(message.sender_username);
        }
        return [...contacts];
    }

    if (messages.isLoading) return <p><LinearProgress /></p>;
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