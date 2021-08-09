import React, { useState, useEffect } from "react";
import axios from "axios";
import UserService from "../services/user.service"

const ViewAll = () => {
    const [all, setAll] = useState();

    const apiCall = async () => {
        UserService.getAll()
            .then(res => {
                console.log(res.data)
                setAll(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        apiCall();
    },[])

    const handleClick = () => {
        UserService.getAll()
            .then(res => {
                console.log(res.data)
                setAll(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <div><button onClick={handleClick}>PP</button></div>
    )
};

export default ViewAll;