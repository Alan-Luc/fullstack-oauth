import React, { useState, useEffect } from "react";
import axios from 'axios'
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
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getAccount();
    },[])

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
        console.log(info);
        UserService.update(info.googleId, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        setEdit(false);
        console.log(profile)
    }

    return (
        <div>
            {info !== undefined && <h1>{info.username}</h1>}
            {!edit ?
                <div>
                    <h4>Name: {profile.name}</h4>
                    <h4>Age: {profile.age}</h4>
                    <h4>Gender: {profile.gender}</h4>
                    <h4>Location: {profile.location}</h4>
                    <h4>Bio: {profile.bio}</h4>
                    <h4>Occupation: {profile.occupation}</h4>
                    <h4>Budget: {profile.budget}</h4>
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
                </div>}
        </div>
    )
}

export default Profile;