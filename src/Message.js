import userContext from "./UserContext";
import PoolPartyApi from './api';
import React, { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

/**
 * Message: component for individual message
 * 
 * Props: User, message, 
 * State: none
 * 
 * Mailbox -> MessageList -> Message 
 */

function Message({ message }) {
    const { user } = useContext(userContext);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        textAlign: 'center',
        borderColor: 'red',
        color: theme.palette.text.secondary
    }));

    return (
        message.sender_username === user.name ?
            <Box display="flex" justifyContent="flex-end">
                <Grid sm={10}>
                    <Item >{message.sender_username}: {message.body}</Item>
                </Grid>
            </Box> :
            <Box display="flex" justifyContent="flex-start">
                <Grid sm={10}>
                    <Item >{message.sender_username}: {message.body}</Item>
                </Grid>
            </Box>
    );

}