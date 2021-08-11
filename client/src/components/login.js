import React from "react";

const Login = () => {
    return (
        <div className="login-container">
            <div style={{display: "flex", flexDirection: "column"}}>
                <img style={{marginLeft:"auto", marginRight: "auto"}}src="https://bit.ly/3iFTGxo" alt="google-icon" width="100"/>
                <a className="login-button" href="http://localhost:8000/auth/google">Sign In With Google</a>
                <p style={{textAlign: "center", fontSize: "larger"}}>or Sign In With Email</p>
            </div>
            <form>
                Email: 
                <br></br>
                <input 
                    type="text" 
                    placeholder="yourname@example.com"
                    className="login-textbox" 
                    ></input>
                <br></br>
                <br></br>
                Password:
                <br></br>
                <input 
                    type="text"
                    placeholder="Enter your password"
                    className="login-textbox" 
                    ></input>
            </form>
            <br></br>
            <button className="login-button2">Sign In</button>
        </div>
    )
}

export default Login;