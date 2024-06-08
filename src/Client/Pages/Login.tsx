import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Login.css';

interface LoginProps {
    orgFunc: (org: string) => void;
    configFunc: (conf: any) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({orgFunc, configFunc}) => {

    const navigate = useNavigate();

    const handleSignup = ()=>navigate('/signup');

    const [admin, setAdmin] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleAdmin = ()=>{
        setAdmin((adminState)=>!adminState)
    }


    const handleLogin = async () =>{
        try{

        let response;

        if (admin){

                response = await axios({
                method: "post",
                url: "http://localhost:3000/admin/login",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  username: username,
                  password: password,
                },
              });

              if (response.status === 200) {
                orgFunc(response.data.key);
                configFunc(response.data.config);
                setMessage('')
                navigate('/adminview')
                
                
        
              } else {
                setMessage('Invalid Username/Password')
              }
            

        }else{

            response = await axios({
                method: "post",
                url: "http://localhost:3000/worker/login",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  username: username,
                  password: password,
                },
              });


              if (response.status === 200) {
                orgFunc(response.data.key);
                configFunc(response.data.config);
                setMessage('')
                navigate('/main')
               
        
              }else {
                setMessage('Invalid Username/Password')
              }

        }

    }catch(error){
        setMessage('Invalid Username/Password')
        
    }

    }

    async function checkToken(){

      try{


      const requestOptions = {
        method: 'get',
        url: 'http://localhost:3000/checkToken',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };


      const response = await axios(requestOptions);



    }catch(error){

    }

    
    }






  return (

        
        <div className = 'container'>
        <button onClick = {checkToken}>checkToken</button>
            
        <div className = 'inputSection'>
        <h2>Login</h2>
        {/* <h2>Login</h2> */}
        {/* <div className = 'nav'>Admin</div> */}
            <div className = 'inputField'>
                <h3>Username</h3>
                <input value =  {username} onChange = {(e)=>setUsername(e.target.value)}></input>
            </div>
            <div className = 'inputField'>
                <h3>Password</h3>
                <input value = {password} onChange = {(e)=>setPassword(e.target.value)}></input>
            </div>
            <div className = 'radioField'>
                <h3>Type:</h3>
                <div>
                    <input type = 'radio' name='adminSelect' id = 'worker' checked = {!admin} onChange = {handleAdmin}></input>
                    <label htmlFor='worker' >Employee</label>
                </div>
                <div>
                <input type = 'radio' name='adminSelect' id = 'admin' checked = {admin} onChange = {handleAdmin}></input>
                <label htmlFor='admin'>Admin</label>
                </div>
            </div>
            <p>{message}</p>
            <div className = 'buttonSection'>
                <button onClick = {handleLogin}>Login</button>
                <button onClick = {handleSignup}>Create Account</button>

            </div>
        </div>
    </div>
  )
}

export default Login;