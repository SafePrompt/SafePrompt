import React from 'react';
import Landing from './Pages/Landing';
import Main from './Pages/Main';
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
                <Route path="/" element={<Landing />} />
                <Route path="/main" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/prompts" element={<Prompts />} />
            </Routes>
        </Router>
    )
}

export default App;