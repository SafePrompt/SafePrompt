import React from 'react';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Main from './Pages/Main';
import SignupWorker from './Pages/SignupWorker';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './Pages/Settings';
import Prompts from './Pages/Prompts';

const App: React.FunctionComponent = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');



    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/signup" element={<SignupWorker />} />
            </Routes>
        </Router>
    )
}

export default App;