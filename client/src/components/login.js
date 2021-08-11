import React from "react";

const Login = () => {
    return (
        <div className="login-container">
            <a className="login-button" href="http://localhost:8000/auth/google">Sign In With Google</a>
            <h2>or Sign In With Email</h2>
            <form>
                Email: 
                <br></br>
                <input type="text" placeholder="yourname@example.com"></input>
                <br></br>
                Password:
                <br></br>
                <input type="text" placeholder="Enter your password"></input>
            </form>
            <button>Sign In</button>
        </div>
    )
}

export default Login;