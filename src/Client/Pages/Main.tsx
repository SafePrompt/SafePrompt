import React, { useState, useEffect } from "react";
import "./Main.css";
import MenuBar from "../Components/MenuBar";
import axios from "axios";

interface Redact {
  prompt: string;
  phone: string[];
  email: string[];
}

const Main: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [redact, setRedact] = useState<Redact | null>(null);

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
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    setOutputText(inputText);
  }, [inputText]);

  const handleCheckPrompt = async () => {
    await validatePrompt();
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
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key
      const newText = (e.target as HTMLSpanElement).innerText;
      handleEdit(newText, redact);
    }
  };

  const renderTextWithHighlights = (text: string, redact: Redact) => {
    const keywords = [...redact.phone, ...redact.email];
    console.log(keywords)
    const parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi"));

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
        <button onClick={handleCheckPrompt} className="check-prompt-btn">
          Check Prompt
        </button>
        <div className="box output-box">
          <div className="editable-output">
            {redact && renderTextWithHighlights(outputText, redact)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
