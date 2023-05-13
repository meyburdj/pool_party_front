import userContext from "./UserContext";
import PoolPartyApi from "./api";
import React, { useState, useContext, useEffect } from "react";
import {
    Button, LinearProgress, Box, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MessageList from "./MessageList";
import ContactList from "./ContactList";
/**
 * Mailbox: Parent component for Messages and Contacts
 * 
 * Props: NA
 * 
 * State: 
 * - user: Derived from context. Contains user information.
 * - allMessages: Array of all messages sent or recieved to current user.
 * - inbox: Set of all users that have ever sent a message to current user.
 * - outbox: Set of all users that have ever recieved a message from current user.
 * - displayedMessages: Array of all messages recieved and sent to selected contact,
 *      ordered by time
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
    console.log("user", user);
    console.log('allMessages', allMessages);

    const [displayedMessages, setDisplayedMessages] = useState();

    const [contactType, setContactType] = useState('outbox');

    const [inbox, setInbox] = useState();

    const [outbox, setOutbox] = useState();

    const [updateConversation, setUpdateConversation] = useState(false);

    /**effect that requests data concerning messages. Sets messages and sorts by
       contacts so that inbox/outbox state is sorted and with unique entries*/
    useEffect(function getMessagesAndSortContacts() {
        async function fetchData() {
            const response = await PoolPartyApi.getMessages();
            console.log("response", response);
            const mergedBoxes = mergeSortedMailboxes(response.inbox, response.outbox);
            const allMessageAtLoad = {
                data: {
                    ...response,
                    merged: mergedBoxes
                },
                isLoading: false,
            };
            setAllMessages(allMessageAtLoad);
            console.log(response.inbox);
            const sortedInbox = sortContactsBasedOnMessages(response.inbox);
            const sortedOutbox = sortContactsBasedOnMessages(response.outbox);
            setInbox(sortedInbox);
            setOutbox(sortedOutbox);
            console.log("sortedOutbox", sortedOutbox);
            selectConversation(sortedOutbox[0], allMessageAtLoad);
        }

        fetchData();
    }, []);

    //sorts messages by sender and reciever into a set 
    function sortContactsBasedOnMessages(messages) {
        let contacts = new Set();
        console.log('messages', messages);
        for (const message of messages) {
            message.sender_username === user.username ?
                contacts.add(message.recipient_username) :
                contacts.add(message.sender_username);
        }
        console.log("contacts", [...contacts]);
        return [...contacts];
    }

    //merges two sorted arrays into one sorted array based on string timestamp
    function mergeSortedMailboxes(inboxArr, outboxArr) {
        let mergedArr = [];
        let inboxI = 0;
        let outboxI = 0;

        while (inboxI < inboxArr.length || outboxI < outboxArr.length) {
            if (inboxI >= inboxArr.length) {
                mergedArr.push(outboxArr[outboxI]);
                outboxI++;
            } else if (outboxI >= outboxArr.length) {
                mergedArr.push(inboxArr[inboxI]);
                inboxI++;
            } else if (Date.parse(inboxArr[inboxI].timestamp) > Date.parse(outboxArr[outboxI].timestamp)) {
                mergedArr.push(inboxArr[inboxI]);
                inboxI++;
            } else {
                mergedArr.push(outboxArr[outboxI]);
                outboxI++;
            }
        }

        return mergedArr;
    }

    // function mergeSortedMailboxes(inboxArr, outboxArr) {
    //     const mergedArr = inboxArr.concat(outboxArr);
    //     return mergedArr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    // }
    //sets the displayed conversation to the selected conversation
    function selectConversation(outsideUser, messages = allMessages) {
        const selectedMessages = messages.data.merged.filter(message => (
            message.sender_username === outsideUser ||
            message.recipient_username === outsideUser)
        );
        setDisplayedMessages(selectedMessages);
    }

    //sets contactType and conversation to the most recent conversation
    function selectMailboxType(type) {
        setContactType(type);
        const typeArr = type === 'inbox' ? inbox : outbox;
        selectConversation(typeArr[0]);
    }

    /*****Start New Message Modal Logic*****/
    const [formDataText, setFormDataText] = useState("");
    const [open, setOpen] = useState(false);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormDataText((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function sendMessage(evt) {
        evt.preventDefault();
        let recepient = displayedMessages[0].sender_username === user.username ?
            displayedMessages[0].recipient_username :
            displayedMessages[0].sender_username;
        const data = {
            body: formDataText.body,
            recipient_username: recepient,
            listing: displayedMessages[0].listing,
        };

        await PoolPartyApi.sendMessage(data);

        handleClose();
    }
    /*****End New Message Modal Logic*****/

    if (allMessages.isLoading) return <p><LinearProgress /></p>;

    return (
        <>
            <section className="mailbox">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <h4 style={{ display: "flex", justifyContent: "center" }}>Contacts</h4>
                        <Box
                            display='flex'
                            gap={.5}
                            justifyContent='flex-start'
                            margin={1.5}
                        >
                            <Button onClick={() => selectMailboxType('outbox')}
                                size="small" variant="outlined" color="success">
                                outbox
                            </Button>
                            <Button onClick={() => selectMailboxType('inbox')}
                                size="small" variant="outlined" color="info">
                                inbox
                            </Button>
                        </Box>
                        <ContactList
                            contacts={contactType === "inbox" ? inbox : outbox}
                            selectConversation={selectConversation} />
                    </Grid>
                    <Grid item xs={12} sm={8} >
                        <h4 style={{ display: "flex", justifyContent: "center" }}>Conversation</h4>
                        <Box style={{ display: "flex", justifyContent: "center" }}>
                            {(displayedMessages?.length > 0) && <Button onClick={handleClickOpen}
                                size="small" variant="outlined" color="info" >
                                new message
                            </Button>}
                        </Box>
                        <Box marginLeft={1}>
                            <MessageList messages={displayedMessages} />
                        </Box>
                    </Grid>
                </Grid>
            </section >
            <div>
                {/* <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth='fullWidth'>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New Message"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Send Message</Button>
                    </DialogActions>
                </Dialog> */}
                <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth='fullWidth'>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogContent>

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
            </div >
        </>

    );
}

export default MailBox;
