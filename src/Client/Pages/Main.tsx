import React, { useState, useEffect } from "react";
import "./Main.css";
import MenuBar from "../Components/MenuBar";
import axios from "axios";

const Main: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [redact, setRedact] = useState({});

  const validatePrompt = async () => {
    console.log("Submitting validation for prompt");
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:3000/validate",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user: "worker",
          key: "320f2ded-28e8-4640-ad65-071a3687e087",
          prompt: inputText,
        },
      });

      console.log("Response:", response.data);
      setRedact(response.data);
      console.log("redact after assignment:", redact);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const handleCheckPrompt = async () => {
    await validatePrompt();
  // const [keywords, setKeywords] = useState(['Christian Magorrian', '17 Winding Lane']); // example keywords

  useEffect(() => {
    setOutputText(inputText);
  }, [inputText]);

    setOutputText(inputText);
    console.log(inputText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleEdit = (newText: string, redact: string) => {
    const updatedText = outputText.replace(redact, newText);
    setOutputText(updatedText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, redact: string) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of Enter key
      const newText = (e.target as HTMLSpanElement).innerText;
      handleEdit(newText, redact);
    }
  };

  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(new RegExp(`(${redact.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      if (redact.includes(part)) {
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
    });;
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
        <button onClick={handleCheckPrompt} className="check-prompt-btn">
          Check Prompt
        </button>
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
