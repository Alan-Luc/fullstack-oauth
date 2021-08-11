import React from "react";
import login from "./login.css";
import { Redirect, Link } from "react-router-dom";

const Landing = () =>{
    return(
        <div className="landing-container">
            <div className="landing-heading">
                <div className="landing-buttons">
                    <button className="landing-button1">Sign Up</button>
                    <Link to="/login">
                        <button className="landing-button2">Sign In</button>
                    </Link>
                    
                </div>
            </div>
            <div className="landing-body">
                <div>
                    <h1 style={{fontSize: "5vw"}}>Homeet</h1>
                    <h1 style={{marginTop: "-3vw"}}>Meet your ideal roommate</h1>
                    <button style={{height: "3vw", width: "8vw", fontSize: "larger", borderRadius: "10px"}}>Get Started</button>
                </div>
                <div>
                    <img style={{marginLeft: "100px"}} src="https://bit.ly/3s7YkqQ" alt="house" width="600"/> 
                </div> 
            </div>
            
        </div>
    )
}

export default Landing;