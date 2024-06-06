import React from 'react';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Signup from './Pages/Signup';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './Pages/Settings';
import Prompts from './Pages/Prompts';
import AdminView from './Pages/AdminView';

const App: React.FunctionComponent = () => {
    
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [orgKey, setOrgKey] = useState('');
    const [config, setConfig] = useState({});

    function setOrg (org:string){
        setOrgKey(org)
    }

    function setConfiguration (conf:any){
        setConfig(conf)
    }




    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login configFunc = {setConfiguration} orgFunc={setOrg}/>} />
                <Route path="/main" element={<Main />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/signup" element={<Signup orgFunc={setOrg} />} />
                <Route path="/adminview" element={<AdminView config = {config} org = {orgKey}/>}/>
            </Routes>
        </Router>
    )
}

export default App;