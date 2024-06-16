import React, { useState, useEffect } from "react";
// import "./Main.css";
import MenuBar from "../Components/MenuBar";
import axios from "axios";
// import Navigation from '../Components/Navigation'

interface Redact {
    prompt: string;
    [key: string]: string[] | string;
}

interface MainProps {
    orgKey: string;
    username: string | null;
    storage: string[];
    setStorage: (storage: string[]) => void;
}

const Main: React.FC<MainProps> = ({
    orgKey,
    username,
    storage = [],
    setStorage,
}) => {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [chatgptResponse, setChatgptResponse] = useState("");
    const [redactedText, setRedactedText] = useState("");
    const [redact, setRedact] = useState<Redact | null>(null);
    const [index, setIndex] = useState<number>(0);

    const [htmlOutput, setHtmlOutput] = useState<any>(null);

    console.log("storage in main: ", storage);
    console.log("index", index);

    const options =
        storage.length > 0
            ? storage.map((prompt, index) => (
                  <option key={index} value={prompt}>
                      {prompt}
                  </option>
              ))
            : [];

    const handleLeft = () => {
        if (index + 1 >= storage.length) setInputText(storage[index]);
        else {
            setInputText(storage[index + 1]);
            setIndex((i: number) => i + 1);
        }
    };

    const handleRight = () => {
        if (index - 1 <= 0) setInputText(storage[index]);
        else {
            setInputText(storage[index - 1]);
            setIndex((i: number) => i - 1);
        }
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const i: number = storage.findIndex(
            (ind) => ind === event.target.value
        );
        setIndex(i);

        setInputText(event.target.value);
    };

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
                    user: username,
                    key: orgKey,
                    prompt: inputText,
                },
            });

            setRedact(response.data.object);
            setStorage(response.data.prompts);
        } catch (err) {}
    };

    useEffect(() => {
        setOutputText(inputText);
    }, [inputText]);

    const handleCheckPrompt = async () => {
        await validatePrompt();
        setOutputText(inputText);
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
            if (key !== "prompt" && key !== "keyword") {
                const values = redact[key] as string[];
                values.forEach((value, index) => {
                    replacements[value] = `[${
                        key.charAt(0).toUpperCase() + key.slice(1)
                    } ${index + 1}]`;
                });
            }
        });

        interface KeywordCache {
            [key: string]: number;
        }

        const keywordCache: KeywordCache = {};

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
                        // contentEditable
                        onKeyDown={(e) => handleKeyDown(e, part)}
                        className="highlight editable">
                        {replacement}
                    </span>
                );
            }
            newString = newString.concat(part);

            return <span key={index}>{part}</span>;
        });

        return [highlightedText, newString]; // Return the array of JSX elements directly
    };

    //write function to grab text and send it to
    const getChatgptResponse = async () => {
        try {
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

            setChatgptResponse(response.data);
        } catch (err) {}
    };

    const submitToOpenai = async () => {
        await getChatgptResponse();
    };

    useEffect(() => {
        if (redact) {
            const [highlightedText, newString] =
                renderTextWithHighlights(redact);
            setHtmlOutput(highlightedText);
            setRedactedText(newString);
        }
    }, [redact]);

    return (
        <div className="mainContainer">
            <div id="verticalContainer">
                <div id="horizontalContainer">
                    <div className="boxContainer">
                        <h2>PROMPT</h2>
                        <textarea
                            className="box"
                            id="inputBox"
                            value={inputText}
                            onChange={handleChange}
                            placeholder="Write your prompt here"></textarea>
                        <div
                            className="circleButton"
                            onClick={handleLeft}
                            id="circleLeft">
                            {}
                        </div>
                        <div
                            className="circleButton"
                            onClick={handleRight}
                            id="circleRight">
                            {}
                        </div>
                    </div>
                    <div className="boxContainer">
                        <h2>SAFEPROMPT</h2>
                        <div className="box" id="promptBox">
                            {redact
                                ? htmlOutput
                                : "SafePrompt will redact here"}
                        </div>
                    </div>
                </div>
                <div id="mainButtonSection">
                    <select
                        // value={storage[index]}
                        
                        name="History"
                        className="dropdown"
                        onChange={(e) => handleSelect(e)}>
                        <option></option>
                        {[options]}
                    </select>
                    <button
                        onClick={handleCheckPrompt}
                        className="check-prompt-btn">
                        Check Prompt
                    </button>
                    <button className="chatgpt-btn" onClick={submitToOpenai}>
                        Send to ChatGPT
                    </button>
                </div>
                <div className="bottomContainer">
                    <h2>RESPONSE</h2>
                    <div className="outputBox">{chatgptResponse}</div>
                </div>
            </div>
        </div>
    );
};

export default Main;
