import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

let socket = io("http://localhost:3000/", {
    withCredentials: true,
});

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "http://localhost:3000/";

    useEffect(() => {
        socket = io.connect(ENDPOINT);
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);
    },[ENDPOINT, location.search])

};

export default Chat;