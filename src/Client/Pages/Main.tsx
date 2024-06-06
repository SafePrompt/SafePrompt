import React, { useState, useEffect } from 'react';
import './Main.css';
import MenuBar from '../Components/MenuBar';

const Main: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [keywords, setKeywords] = useState(['Christian Magorrian', '17 Winding Lane']); // example keywords

  useEffect(() => {
    setOutputText(inputText);
  }, [inputText]);

  const handleCheckPrompt = () => {
    setOutputText(inputText);
    console.log(inputText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleEdit = (newText: string, keyword: string) => {
    const updatedText = outputText.replace(keyword, newText);
    setOutputText(updatedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, keyword: string) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key
      const newText = (e.target as HTMLSpanElement).innerText;
      handleEdit(newText, keyword);
    }
  };

  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      if (keywords.includes(part)) {
        return (
          <span
            key={index}
            contentEditable
            onKeyDown={(e) => handleKeyDown(e, part)}
            className="highlight editable"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="main-container">
      <MenuBar />
      <div className="container">
        <div className="box input-box">
          <textarea
            value={inputText}
            onChange={handleChange}
            placeholder="Paste your prompt here"
          />
        </div>
        <button onClick={handleCheckPrompt} className="check-prompt-btn">Check Prompt</button>
        <div className="box output-box">
          <div className="editable-output">
            {renderTextWithHighlights(outputText)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
