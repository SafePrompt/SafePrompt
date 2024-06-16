import React from "react";
import SafePromptLogo from "../../Assets/SafePromptLogo.png";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface LoggedInProps {
    loggedIn: boolean;
    admin: boolean;
    setLoggedIn: (LoggedIn: boolean) => void;
}

const Navigation: React.FunctionComponent<LoggedInProps> = ({
    loggedIn,
    admin,
    setLoggedIn,
}) => {
    const navigate = useNavigate();

    const handleLogIn = async () => {
        setLoggedIn(!loggedIn);
        // await axios.get("http://localhost:3000/logout");

        await axios({
            method: "GET",
            url: "http://localhost:3000/logout",
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        navigate("/login");
    };

    return (
        <nav className="nav">
            <div id="logoSection">
                <img id="logo" src={SafePromptLogo} />
                <h1>safePrompt</h1>
            </div>
            <ul className="navList">
                {admin && <li onClick={() => navigate("/adminview")}>Admin</li>}
                {loggedIn && <li onClick={handleLogIn}>Log Out</li>}
                {!loggedIn && <li onClick={handleLogIn}>Log In</li>}
            </ul>
        </nav>
    );
};

export default Navigation;
