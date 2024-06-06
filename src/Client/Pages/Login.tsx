import React from 'react';
import {useNavigate} from 'react-router-dom'
import './Login.css';

const Login: React.FunctionComponent = () => {

    const navigate = useNavigate();

    const handleSignup = ()=>navigate('/signup')

  return (

        
        <div className = 'container'>
             <h2>Login</h2>
        <div className = 'inputSection'>
        {/* <h2>Login</h2> */}
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
                <button>Login</button>
                <button onClick = {handleSignup}>Create Account</button>

            </div>
        </div>
    </div>
  )
}

export default Login;