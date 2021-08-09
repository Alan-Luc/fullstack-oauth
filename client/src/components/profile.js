import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Redirect, Link } from "react-router-dom"
import UserService from "../services/user.service";

const Profile = () => {
    const profileInitial = {
        name: "",
        age: "",
        gender: "",
        bio: "",
        location: "",
        occupation: "",
        budget: ""
    };

    const [info, setInfo] = useState();
    const [profile, setProfile] = useState(profileInitial);
    const [edit, setEdit] = useState(false);

    const getAccount = async () => {
        axios.get("/profile")
            .then(res => {
                setInfo(res.data)
                setProfile(res.data.profile);
                console.log(res.data)
                console.log(res.data.profile)
            })
            .catch(err => {
                console.log(err);
                window.location.href = "http://localhost:3000/";
            })
    }

    useEffect(()=>{
        getAccount();
    },[edit])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const updateProfile = () =>{
        var data = {
            profile: {
              name: profile.name,
              age: profile.age,
              gender: profile.gender,
              bio: profile.bio,
              location: profile.location,
              occupation: profile.occupation,
              budget: profile.budget
            }
        }
        console.log(info._id);
        UserService.update(info._id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setProfile(data);
        getAccount();
        setEdit(false);
        console.log(profile)
        console.log(info.profile)
    }

    const logout = () => {
        axios.get("/auth/logout")
            .then(res => {
                console.log(res)
                console.log("fuck yourself")
                window.location.href = "http://localhost:3000/"
            })
            .catch(e => {
                console.log(e)
            })
        return <Redirect to="/"/>
    };

    return (
        <div>
            {info !== undefined && <h1>{info.username}</h1>}
            {(!edit && (info !== undefined))?
                <div>
                    <h4>Name: {info.profile.name}</h4>
                    <h4>Age: {info.profile.age}</h4>
                    <h4>Gender: {info.profile.gender}</h4>
                    <h4>Location: {info.profile.location}</h4>
                    <h4>Bio: {info.profile.bio}</h4>
                    <h4>Occupation: {info.profile.occupation}</h4>
                    <h4>Budget: {info.profile.budget}</h4>
                    <button onClick={() => setEdit(true)}>Edit Profile</button>
                </div> :
                <div>
                    <form style={{display: "flex", flexDirection:"column", width: "200px", marginLeft: "auto", marginRight: "auto"}}>
                        <input 
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Name"
                        />
                        <input 
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Age"
                        />
                        <input 
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            type="text" 
                            placeholder="gender"
                        />
                        <input 
                          name="bio"
                          value={profile.bio}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Bio"
                        />
                        <input 
                          name="location"
                          value={profile.location}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Location"
                        />
                        <input 
                          name="occupation"
                          value={profile.occupation}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Occupation"
                        />
                        <input 
                          name="budget"
                          value={profile.budget}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Budget per month"
                        />
                    </form>
                    <button style={{width: "150px", marginLeft: "auto", marginRight: "auto"}} onClick={() =>updateProfile()}>Save</button>
                    <button style={{width: "150px", marginLeft: "auto", marginRight: "auto"}} onClick={() => setEdit(false)}>Go Back</button>
                </div>}
                <button onClick={logout}>Logout</button>
                <Link to="/all"><button>View All</button></Link>
        </div>
    )
}

export default Profile;