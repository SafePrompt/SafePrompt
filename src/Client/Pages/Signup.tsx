import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignupProps {
    orgFunc: (org: string) => void;
    setGlobalUsername: (username: string | null) => void;
}

const Signup: React.FunctionComponent<SignupProps> = ({
    orgFunc,
    setGlobalUsername,
}) => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [org, setOrg] = useState("");

    const handleAdmin = () => {
        setAdmin((adminState) => !adminState);
    };

    const handleSignup = async () => {
        try {
            let response;

            if (admin) {
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
                    withCredentials: true,
                });

                if (response.status === 200) {
                    orgFunc(response.data);
                    navigate("/adminview");
                    setGlobalUsername(username);
                }
            } else {
                response = await axios({
                    method: "post",
                    url: "http://localhost:3000/worker/signup",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        username: username,
                        password: password,
                        key: org,
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    orgFunc(response.data);
                    navigate("/");
                    setGlobalUsername(username);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log("admin", admin);

    return (
        <div className="container">
            <div className="inputContainer">
                <div className="inputSection">
                    <h2 className="inputHeader">Create Account</h2>
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
                    {!admin && (
                        <div className="inputField">
                            <h3> Org Key:</h3>
                            <input
                                value={org}
                                onChange={(e) =>
                                    setOrg(e.target.value)
                                }></input>
                        </div>
                    )}
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
                        <button className="button2" onClick={handleSignup}>
                            Create Account
                        </button>
                    </div>
                </div>
                <div className="footer">
                    <div>Have an account?</div>
                    <a className="link" onClick={() => navigate("/")}>
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
