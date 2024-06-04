import React, { useState } from 'react';
import './Main.css';
import MenuBar from '../Components/MenuBar';

const Main: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleCheckPrompt = () => {
    setOutputText(inputText);
    console.log(inputText)
  };

  return (
    <div className="main-container">
      <MenuBar />
      <div className="container">
        <div className="box input-box">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your prompt here"
          />
        </div>
        <button onClick={handleCheckPrompt} className="check-prompt-btn">Check Prompt</button>
        <div className="box output-box">
          <textarea
            value={outputText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
