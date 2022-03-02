import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import App from './App';


export default function Chat () {
    
    const inputRef = React.createRef();
    const [chatMessages, setChatMessage] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState([]);
    
    // socket io
    // const PORT = process.env.PORT || 7777;
    const socketUrl = process.env.URL || `localhost:7777`
    const socket = io(`${socketUrl}`);

    socket.on("receive-message", (message) => {
        let temp = [...receivedMessage];
        temp.push(message);
        setReceivedMessage(temp);
    });

    const sendMessage = (e) => {
        e.preventDefault();
        let temp = [...chatMessages];
        temp.push(inputRef.current.value);
        setChatMessage(temp);
        inputRef.current.value = "";
        socket.emit('send-message', inputRef.current.value);
    }
  
    return (
        <>
        <button onClick={sendMessage}>Send messege</button><br/>
        <input ref={inputRef} type='text' placeholder='Enter message'/>
        <div id='sent-message'>{chatMessages.map((message, index) => <p key={index}>{message}</p>)}</div>
        <div id='received-message'>{receivedMessage.map((message, index) => <p key={index}>{message}</p>)}</div>
        </>
    );
}