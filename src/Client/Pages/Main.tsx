import React, { useState } from "react";
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
          key: "4c874153-2b60-474a-85cb-6972d92f8e85",
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

    setOutputText(inputText);
    console.log(inputText);
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
        <button onClick={handleCheckPrompt} className="check-prompt-btn">
          Check Prompt
        </button>
        <div className="box output-box">
          <textarea value={outputText} readOnly />
        </div>
        <div className="box output-box">
          <textarea value={outputText} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Main;
