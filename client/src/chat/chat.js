import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import "./chat.css"
import axios from "axios"

let socket = io("http://localhost:8000/", {
    withCredentials: true,
});

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [flag, setFlag] = useState(0);
    const ENDPOINT = "http://localhost:8000/";
    

    useEffect(() => {
        socket = io.connect(ENDPOINT);
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (e) => {
            if(e) {
                setFlag(1);
                alert(e)
            }
        });
    },[ENDPOINT, location.search])
    
    /*useEffect(() => {
        window.onbeforeunload = setMessages(sessionStorage.getItem("chat"))
    
        return () => {
            window.onbeforeunload = null;
        };
    }, []);*/

    useEffect(() => {
        socket.on("roomData", ({ users }) => {
            setUsers(users)
            console.log(users);
        });

        socket.on("message", (message) => {
            setMessages(messages => [ ...messages, message ]);
        });
        console.log(messages)
    },[])

    useEffect(() => {
        sessionStorage.setItem("chat", JSON.stringify(messages));
        let data = JSON.parse(sessionStorage.getItem("chat"));
        console.log(data);
    },[messages]);





    const handleKeyPress = (e) => {
        if(e.key && (message === "")) {
            socket.emit("typing");
            if(e.key === "Enter") {
                sendMessage(e)
            }
            return null
        }
    };
    

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit("chat", message, () => setMessage(""));
        console.log(messages)
    };

    return (
        <div>
            <div className="chatBox">
                {messages.length !== 0 && messages.map((item, i) => <div className="messages" key={i}><h4 style={item.user !== messages[0].user ? {marginRight: "10px", backgroundColor: "pink"} : {marginRight: "10px", backgroundColor: "blue"}  }>{item.text} </h4><h4> {item.user}</h4></div>)}
            </div>
            {console.log(sessionStorage.getItem("chat"))}
            <form className="message">
                <input 
                    placeholder=""
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => handleKeyPress(e)}
                />
                <button onClick={e => sendMessage(e)}>send</button>
            </form>
        </div>
    )

};

export default Chat;