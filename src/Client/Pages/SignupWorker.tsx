import React from 'react';
import './Login.css';

const SignupWorker: React.FunctionComponent = () => {

  return (

        
        <div className = 'container'>
        <div className = 'inputSection'>
        {/* <div className = 'nav'>Admin</div> */}
            <div className = 'inputField'>
                <h3>Username:</h3>
                <input></input>
            </div>
            <div className = 'inputField'>
                <h3>Password:</h3>
                <input></input>
            </div>
            <div className = 'inputOrg'>
                <h3>Organization Key:</h3>
                <input></input>
            </div>
            <div className = 'buttonSection'>
                <button>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default SignupWorker;