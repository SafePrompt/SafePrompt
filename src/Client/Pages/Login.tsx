import React from 'react';
import './Login.css';

const Login: React.FunctionComponent = () => {

  return (

        
        <div className = 'container'>
        <div className = 'inputSection'>
        {/* <div className = 'nav'>Admin</div> */}
            <div className = 'inputField'>
                <h3>Username</h3>
                <input></input>
            </div>
            <div className = 'inputField'>
                <h3>Password</h3>
                <input></input>
            </div>
            <div className = 'buttonSection'>
                <button>Log In</button>
                <button>Sign Up</button>
            </div>
        </div>
    </div>
  )
}

export default Login;