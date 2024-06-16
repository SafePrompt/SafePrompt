import React from "react";
import SafePromptLogo from "../../Assets/SafePromptLogo.png";
import { useNavigate } from "react-router-dom";
interface LoggedInProps {
    loggedIn: boolean;
    admin: boolean;
}

const Navigation: React.FunctionComponent<LoggedInProps> = ({
    loggedIn,
    admin,
}) => {
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <div id="logoSection">
                <img id="logo" src={SafePromptLogo} />
                <h1>safePrompt</h1>
            </div>
            <ul className="navList">
                {admin && <li onClick={() => navigate("/adminview")}>Admin</li>}
                <li onClick={() => navigate("/login")}>
                    {loggedIn ? "Logout" : "Login"}
                </li>
                {/* <img id="logo" src={SafePromptLogo} /> */}
            </ul>
        </nav>
    );
};

export default Navigation;
