import React from "react";
import SafePromptLogo from "../../Assets/SafePromptLogo.png";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface LoggedInProps {
    loggedIn: boolean;
    admin: boolean;
    setLoggedIn: (LoggedIn: boolean) => void;
    permission: boolean | null;
}

const Navigation: React.FunctionComponent<LoggedInProps> = ({
    loggedIn,
    admin,
    setLoggedIn,
}) => {
    const navigate = useNavigate();

    const handleLogIn = async (login: boolean) => {
        if (login) {
            setLoggedIn(false);
            // await axios.get("http://localhost:3000/logout");

            await axios({
                method: "GET",
                url: "http://localhost:3000/logout",
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
        }

        navigate("/login");
    };

    return (
        <nav className="nav">
            <div id="logoSection">
                <img id="logo" src={SafePromptLogo} />
                <h1>safePrompt</h1>
            </div>
            <ul className="navList">
                {admin && loggedIn && (
                    <li onClick={() => navigate("/")}>Query</li>
                )}
                {admin && loggedIn && (
                    <li onClick={() => navigate("/adminview")}>Settings</li>
                )}
                {loggedIn && <li onClick={() => handleLogIn(true)}>Log Out</li>}
                {!loggedIn && (
                    <li onClick={() => handleLogIn(false)}>Log In</li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
