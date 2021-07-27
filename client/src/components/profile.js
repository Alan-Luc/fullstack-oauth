import React, { useState, useEffect } from "react";

const Profile = () => {
    const [data, setData] = useState();

    const api_call = async () => {
        const call = await fetch("/profile");
        const data = await call.json();
        setData(data);
        console.log(data);
    }

    return (
        <div>
            {data !== undefined && <h1>{data.username}</h1>}
            <button onClick={api_call}></button>
        </div>
    )
}

export default Profile;