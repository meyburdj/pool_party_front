import userContext from "./UserContext";
import PoolPartyApi from "./api";
import React, { useState, useContext, useEffect } from "react";
import { Button, LinearProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import MessageList from "./MessageList";
import ContactList from "./ContactList";
/**
 * Mailbox: Parent component for Messages and Contacts
 * 
 * Props: 
 * state: user, allMessages, inbox, outbox
 * 
 * Mailbox -> MessageList -> [Message, Message, ...]
 * Mailbox -> ConactList -> [Contact, Contact, ...]
 * 
 */
function MailBox() {
    const { user } = useContext(userContext);
    const [allMessages, setAllMessages] = useState({
        data: null,
        isLoading: true,
    });

    const [displayedMessages, setDisplayedMessages] = useState();

    const [contactType, setContactType] = useState('outbox');

    const [inbox, setInbox] = useState();

    const [outbox, setOutbox] = useState();

    /**effect that requests data concerning messages. Sets messages and sorts by
       contacts so that inbox/outbox state is sorted and with unique entries*/
    useEffect(function getMessagesAndSortContacts() {
        async function fetchData() {
            const response = await PoolPartyApi.getMessages();
            console.log(response);
            setAllMessages({
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

    //sorts messages by sender and reciever into a set 
    function sortContactsBasedOnMessages(messages) {
        let contacts = new Set();

        for (const message of messages) {
            message.sender_username === user ?
                contacts.add(message.recipient_username) :
                contacts.add(message.sender_username);
        }
        return [...contacts];
    }

    //sets the displayed conversation to the selected conversation
    function selectConversation(outsideUser) {
        const selectedMessages = allMessages.filter(message => (
            message.sender_username === outsideUser ||
            message.recipient_username === outsideUser)
        );
        setDisplayedMessages(selectedMessages);
    }

    if (allMessages.isLoading) return <p><LinearProgress /></p>;

    return (
        <section className="mailbox">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box
                        display='flex'
                        gap={.5}
                        justifyContent='flex-start'
                        margin={1.5}
                    >
                        <Button variant="contained" color="info">inbox</Button>
                        <Button variant="contained" color="info">outbox</Button>
                    </Box>
                    <ContactList
                        contacts={contactType === "inbox" ? inbox : outbox}
                        selectConversation={selectConversation} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <MessageList messages={displayedMessages} />
                </Grid>
            </Grid>
        </section>
        // <>
        //     <h4>Outbox</h4>
        //     {(messages.data) && messages.data.outbox.map(message => (
        //         <div key={message.id}>
        //             <br />
        //             <p>sender: {message.sender_username}</p>
        //             <p>recepient: {message.recipient_username}</p>
        //             <p>message body</p>
        //             <p>{message.body}</p>
        //             <p>pool listing: {message.listing}</p>
        //             <p>message timestamp: {message.timestamp}</p>
        //         </div>

        //     ))}
        //     <h4>Inbox</h4>
        //     {messages.data.map(message => )}
        // </>

    );
}

export default MailBox;