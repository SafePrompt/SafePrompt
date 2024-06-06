import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

interface SignupProps {
    orgFunc: (org: string) => void;
}

const Signup: React.FunctionComponent<SignupProps> = ({orgFunc}) => {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [org, setOrg] = useState("");

    const handleAdmin = ()=>{
        setAdmin((adminState)=>!adminState)
        

    }
    console.log('admin', admin)

  

  
    const handleSignup = async () =>{
        try{

        let response;

        if (admin){

                response = await axios({
                method: "post",
                url: "http://localhost:3000/admin/signup",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  username: username,
                  password: password,
                },
              });

              if (response.status === 200) {
                orgFunc(response.data);
        
              }
            

        }else{

            response = await axios({
                method: "post",
                url: "http://localhost:3000/worker/signup",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  username: username,
                  password: password,
                  key: org
                },
              });


              if (response.status === 200) {
                orgFunc(response.data);
                navigate('/main')
        
              }

        }

    }catch(error){
        console.log(error)
    }

    }

    console.log('admin', admin)



  return (

        
        <div className = 'container'>
           
        <div className = 'inputSection'>
        <h2>Create Account</h2>
        {/* <div className = 'nav'>Admin</div> */}
            <div className = 'inputField'>
                <h3>Username:</h3>
                <input value = {username} onChange = {(e)=>setUsername(e.target.value)}></input>
            </div>
            <div className = 'inputField'>
                <h3>Password:</h3>
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
            {!admin && <div className = 'inputOrg'>
                <h3>Organization Key:</h3>
                <input value = {org} onChange = {(e)=>setOrg(e.target.value)}></input>
            </div>}
            <div className = 'buttonSection'>
                <button onClick = {handleSignup}>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default Signup;