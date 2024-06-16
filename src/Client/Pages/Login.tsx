import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

interface LoginProps {
    orgFunc: (org: string) => void;
    configFunc: (conf: any) => void;
    setGlobalUsername: (username: string | null) => void;
    setStorage: (storage: any) => void;
    setLoggedIn: (loggedIn: boolean) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({
    orgFunc,
    configFunc,
    setGlobalUsername,
    setStorage,
    setLoggedIn,
}) => {
    const navigate = useNavigate();

    const handleSignup = () => navigate("/signup");

    const [admin, setAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleAdmin = () => {
        setAdmin((adminState) => !adminState);
    };

    const handleLogin = async () => {
        try {
            let response;

            if (admin) {
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
                    withCredentials: true,
                });

                if (response.status === 200) {
                    orgFunc(response.data.key);
                    configFunc(response.data.config);
                    setMessage("");
                    setStorage(response.data.prompts);
                    navigate("/");
                    setGlobalUsername(username);
                    setLoggedIn(true);
                } else {
                    setMessage("Invalid Username/Password");
                }
            } else {
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
                    withCredentials: true,
                });

                if (response.status === 200) {
                    orgFunc(response.data.key);
                    configFunc(response.data.config);
                    setMessage("");
                    setStorage(response.data.prompts);
                    navigate("/");
                    setGlobalUsername(username);
                    setLoggedIn(true);
                } else {
                    setMessage("Invalid Username/Password");
                }
            }
        } catch (error) {
            setMessage("Invalid Username/Password");
        }
    };

    return (
        <div className="container">
            <div className="inputContainer">
                <div className="inputSection">
                    <h2 className="inputHeader">Login</h2>
                    <div className="inputField">
                        <h3>Username</h3>
                        <input
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }></input>
                    </div>
                    <div className="inputField">
                        <h3>Password</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }></input>
                    </div>
                    <div className="radioField">
                        <h3>Type:</h3>
                        <div>
                            <div>
                                <input
                                    className="radius"
                                    type="radio"
                                    name="adminSelect"
                                    id="worker"
                                    checked={!admin}
                                    onChange={handleAdmin}></input>
                                <label htmlFor="worker">Employee</label>
                            </div>

                            <div>
                                <input
                                    className="radius"
                                    type="radio"
                                    name="adminSelect"
                                    id="admin"
                                    checked={admin}
                                    onChange={handleAdmin}></input>
                                <label htmlFor="admin">Admin</label>
                            </div>
                        </div>
                    </div>
                    <div className="buttonSection">
                        <button className="button2" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
                <div className="footer">
                    <div>Don't have an account?</div>
                    <a className="link" onClick={handleSignup}>
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
