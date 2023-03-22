import userContext from "./UserContext";
import PoolPartyApi from './api';
import React, { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

/**
 * Messages: Parent component for conversations and messages
 * 
 * Props: User
 * State: messages
 * 
 * Messages -> contacts
 * Messages -> [messageCard, messageCard, ...] 
 */
function MessageList() {
  const { user } = useContext(userContext);
  const [messages, setMessages] = useState({
    data: null,
    isLoading: true,
  });

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
    <Box sx={{ flexGrow: 1, borderColor: 'primary.main' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          {messages.map(message => (
            message.text
          ))}
          <Item >xs=8</Item>

        </Grid>

        <Grid item xs={12} sm={8}>
          {messages.map(message => (
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
          ))}
        </Grid>

      </Grid>
    </Box>
  );
}


export default Messages;



