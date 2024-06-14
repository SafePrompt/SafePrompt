import React from "react";
import headerBg from "../../Assets/header-bg.png";
import headerImg from "../../Assets/header-img.png";
import { useNavigate } from "react-router-dom";

const Landing: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="navbar">
                <div className="safeprompt">safePrompt</div>
                <div className="login-signup">
                    <div className="login" onClick={() => navigate("/login")}>
                        Log In
                    </div>
                    <div className="signup" onClick={() => navigate("/signup")}>
                        Sign Up
                    </div>
                </div>
            </div>
            <div className="header-main">
                <img src={headerImg} alt="header image" />
                <div className="main-content">
                    <h1>USE GENERATIVE AI SECURELY, CONFIDENTLY, AND SAFELY</h1>
                    <p>
                        Don’t let your confidential information be training data
                        for LLMs.
                    </p>
                </div>
            </div>
            <footer className="footer"></footer>
        </div>
    );
};

export default Landing;
