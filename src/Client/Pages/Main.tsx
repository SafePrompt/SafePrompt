import React, { useState, useEffect } from "react";
import "./Main.css";
import MenuBar from "../Components/MenuBar";
import axios from "axios";

interface Redact {
  prompt: string;
  [key: string]: string[] | string;
}

const Main: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [chatgptResponse, setChatgptResponse] = useState("");
  const [redactedText, setRedactedText] = useState("");
  const [redact, setRedact] = useState<Redact | null>(null);

  const [htmlOutput, setHtmlOutput] = useState<any>(null);

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
          user: "Rick",
          key: "4c874153-2b60-474a-85cb-6972d92f8e85",
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    redact: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of Enter key
      const newText = (e.target as HTMLSpanElement).innerText;
      handleEdit(newText, redact);
    }
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const renderTextWithHighlights = (redact: Redact | any) => {
    const text = redact.prompt;
    let replacements: { [key: string]: string } = {};

    Object.keys(redact).forEach((key) => {
      if (key !== "prompt") {
        const values = redact[key] as string[];
        values.forEach((value, index) => {
          replacements[value] = `[${
            key.charAt(0).toUpperCase() + key.slice(1)
          } ${index + 1}]`;
        });
      }
    });

    const escapedKeywords = Object.keys(replacements).map(escapeRegExp);
    const regexPattern = `(${escapedKeywords.join("|")})`;
    const parts = text.split(new RegExp(regexPattern, "gi"));

    let newString = "";

    const highlightedText = parts.map((part: any, index: any) => {
      const replacement = replacements[part];
      if (replacement) {
        newString = newString.concat(replacement);
        return (
          <span
            key={index}
            contentEditable
            onKeyDown={(e) => handleKeyDown(e, part)}
            className="highlight editable"
          >
            {replacement}
          </span>
        );
      }
      newString = newString.concat(part);

      console.log("newString after part: ", newString);
      return <span key={index}>{part}</span>;
    });

    return [highlightedText, newString]; // Return the array of JSX elements directly
  };


  const result =
console.log('this is redacted text:', redactedText);
  //write function to grab text and send it to
  const getChatgptResponse = async () => {
    try {
      console.log(
        "Submitting redacted prompt to ChatGPT. Prompt: ",
        redactedText
      );
      console.log("about to hit response");
      let response = await axios({
        method: "post",
        url: "http://localhost:3000/GPT/submit",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          prompt: redactedText,
        },
      });

      console.log("Response from ChatGPT:", response.data);
      setChatgptResponse(response.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const submitToOpenai = async () => {
    await getChatgptResponse();
  };

  // useEffect(() => {
  //   redact! ==  && setHtmlOutput(renderTextWithHighlights(redact));
  // }, [redact]);

  useEffect(() => {
    if (redact) {
      const [ highlightedText, newString ] = renderTextWithHighlights(redact);
      setHtmlOutput(highlightedText);
      setRedactedText(newString);
    }
  }, [redact]);

  return (
    <div className="main-container">
      <MenuBar />
      <div className="rows-container">
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
          <div className="output-box-and-button">
            <div className="box output-box">
              <div className="editable-output">
                {redact && renderTextWithHighlights(redact)}
              </div>
            </div>
            <button className="chatgpt-btn" onClick={submitToOpenai}>
              Send to ChatGPT
            </button>
          </div>
        </div>
        <div className="container">
          <div className="box">{chatgptResponse}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
