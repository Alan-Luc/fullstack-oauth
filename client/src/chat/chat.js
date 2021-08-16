import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

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

    const handleKeyPress = (e) => {
        if(e.key) {
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
            <form>
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