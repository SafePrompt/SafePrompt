import React from "react";
import SafePromptLogo from "../../Assets/SafePromptLogo.png";
interface LoggedInProps {
    loggedIn: boolean;
}

const Navigation: React.FunctionComponent<LoggedInProps> = ({ loggedIn }) => {
    return (
        <nav className="nav">
            <img id="logo" src={SafePromptLogo} />
            <ul className="navList">
                <li>Admin</li>
                <li>{loggedIn ? "Logout" : "Login"}</li>
            </ul>
        </nav>
    );
};

export default Navigation;
