import React from 'react';
import {Link} from 'react-router-dom';
import './MenuBar.css';

const MenuBar: React.FC = () => {
  return (
    <div className="menu-bar">
      <h1 className="menu-title">SafePrompt</h1>
      <div className="menu-item">
        <Link to="/settings" className="menu-link">Settings</Link>
      </div>
      <div className="menu-item">
        <Link to="/prompts" className="menu-link">Prompts</Link>
      </div>
      <div className="menu-item">
        <select id="prompts-dropdown" className="menu-dropdown">
          <option value="prompt1">Prompt 1</option>
          <option value="prompt2">Prompt 2</option>
          <option value="prompt3">Prompt 3</option>
        </select>
      </div>
    </div>
  );
};

export default MenuBar;