import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase';
import './App.css';
import Message from './Message';
import db from './firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{username: 'Aaron', message: 'Hello'}]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please Enter Your Name"));
  }, [])

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  }

  return (
    <div className="App">
      <h1>Messenger App</h1>
      <h2>Welcome {username}</h2>

      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>


          <IconButton
            className="app_iconButton"
            disabled={!input} 
            variant="contained" 
            color="primary" 
            type="submit" 
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>

        </FormControl>  
      </form>
      
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} message={message} username={username}/>
          ))
        }
      </FlipMove>
      
    </div>
  );
}

export default App;
