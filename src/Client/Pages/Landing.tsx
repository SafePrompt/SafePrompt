import React from 'react';
import headerBg from '../../Assets/header-bg.png'; 
import headerImg from '../../Assets/header-img.png'; 

const Landing: React.FunctionComponent = () => {
  return (
    <div className='container'>
      <div className='navbar'>
        <div className='safeprompt'>safePrompt</div>
        <div className='login-signup'>
          <div className='login'>Log In</div>
          <div className='signup'>Sign Up</div>
        </div>
      </div>
      <div className='header-main'>

        <img src={headerImg} alt="header image" />
        <div className='main-content'>
          <h1>USE GENERATIVE AI SECURELY, CONFIDENTLY, AND SAFELY</h1>
          <p>Don’t let your confidential information be training data for LLMs.</p>
        </div>
      </div>
      <footer className='footer'></footer>
    </div>
  )
}

export default Landing;
