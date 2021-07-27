import React, { useState, useEffect } from "react";

const Profile = () => {
    const [data, setData] = useState();
    useEffect(() => {
        api_call();
    },[])

    const api_call = async () => {
        const call = await fetch("http://localhost:8000/profile");
        const data = await call.json();
        setData(data);
        console.log(data);
    }

    return (
        <div>
            <h1>{data}</h1>
            <h2>dasfdsajfasl</h2>
        </div>
    )
}

export default Profile;