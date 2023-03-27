import userContext from "./UserContext";
import PoolPartyApi from './api';
import React, { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Message from "./Message";

/**
 * Messages: Parent component for messages
 * 
 * Props: messages
 * 
 * Mailbox -> MessageList -> [Message, Message, ...]
 * 
 */
function MessageList({ messages }) {
  console.log("messages", messages);
  const { user } = useContext(userContext);
  // const [messages, setMessages] = useState({
  //   data: null,
  //   isLoading: true,
  // });

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   margin: theme.spacing(1),
  //   textAlign: 'center',
  //   borderColor: 'red',
  //   color: theme.palette.text.secondary
  // }));
  console.log("messages in messageList", messages);
  if (!messages || messages.length === 0) return <div>No messages currently</div>;
  return (
    // <Box sx={{ flexGrow: 1, borderColor: 'primary.main' }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={4} >
    //       {messages.map(message => (
    //         message.text
    //       ))}
    //       <Item >xs=8</Item>

    //     </Grid>

    // <Grid item xs={12} sm={8}>
    <>
      {messages.map(message => (
        message.sender_username === user.name ?
          <Box display="flex" justifyContent="flex-end">
            <Grid sm={10}>
              <Message message={message}></Message>
            </Grid>
          </Box> :
          <Box display="flex" justifyContent="flex-start">
            <Grid sm={10}>
              <Message message={message}></Message>
            </Grid>
          </Box>
      ))}
    </>
    // </Grid>

    // </Grid> 
    // </Box>
  );
}


export default MessageList;



