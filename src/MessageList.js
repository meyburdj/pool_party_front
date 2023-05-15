import userContext from "./UserContext";
import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Message from "./Message";

/**
 * MessageList: Displays conversation between current user and other user
 * 
 * Props: 
 * - messages: Array of message objects
 * 
 * State:
 * - user: Derived from context. Contains user information.
 * 
 * Component tree:
 *  Mailbox -> MessageList -> [Message, Message, ...]
 */
function MessageList({ messages }) {
  console.log("messages", messages);
  const { user } = useContext(userContext);

  if (!messages || messages.length === 0) return <div>No messages currently</div>;
  return (
    <>
      {messages.map(message => (
        message.sender_username !== user.username ?
          <Box display="flex" justifyContent="flex-end" key={`${message.id}-box`}>
            <Grid item xs={10} key={`${message.id}-grid`}>
              <Message message={message} key={`${message.id}-message`}></Message>
            </Grid>
          </Box> :
          <Box display="flex" justifyContent="flex-start" key={`${message.id}-box`}>
            <Grid item xs={10} key={`${message.id}-grid`}>
              <Message message={message} key={`${message.id}-message`}></Message>
            </Grid>
          </Box>
      ))}
    </>
  );
}


export default MessageList;


