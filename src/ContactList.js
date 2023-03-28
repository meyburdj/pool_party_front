import React, { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ContactButton from "./ContactButton";

/**
 * ContactList: component for list of contact buttons
 * 
 * Props: contacts, selectConversation()
 * State: none
 * 
 * Mailbox -> ContactList -> ContactButtons
 */
function ContactList({ contacts, selectConversation }) {
    console.log("contacts", contacts);
    if (!contacts || contacts.length === 0) return <div>No contacts currently.</div>;
    return (
        <>
            {contacts.map(contact =>
                <ContactButton key={`${contact}-btn`} contact={contact} selectConversation={selectConversation} />
            )}
        </>
    );
}

export default ContactList;