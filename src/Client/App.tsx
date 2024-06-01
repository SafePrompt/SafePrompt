import React from 'react';
import Landing from './Pages/Landing';
import Main from './Pages/Main';
import { useState } from 'react';

const App: React.FunctionComponent = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');



    return (
        <div>
            <Main/>
        </div>
    )
}

export default App;