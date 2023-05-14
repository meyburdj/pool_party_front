import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

/**
 * ContactButton: Button with the name of a contact. Clicking rerenders MessageList
 * 
 * Props: 
 * - contact: username of user that has been sent or recieved a message from 
 *      current user
 * - selectConversation(): prop drilled from Mailbox to ContactButton. Creates 
 *      an array of messages between current user and contact, sorted by date.
 * 
 * State: NA
 * 
 * Component tree:
 *  Mailbox -> ContactList -> ContactButton
 */

function ContactButton({ contact, selectConversation }) {
    const Contact = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        textAlign: 'center',
        cursor: 'pointer',
    }));

    function handleClick() {
        selectConversation(contact);
    }

    return (
        <Contact onClick={handleClick}>{contact}</Contact>
    );
}

export default ContactButton;