import React from 'react';
import './MenuBar.css';

const MenuBar: React.FC = () => {
  return (
    <div className="menu-bar">
      <h1 className="menu-title">SafePrompt</h1>
      <div className="menu-item">
        <label htmlFor="prompts-dropdown" className="menu-label">Prompts</label>
        <select id="prompts-dropdown" className="menu-dropdown">
          <option value="prompt1">Prompt 1</option>
          <option value="prompt2">Prompt 2</option>
          <option value="prompt3">Prompt 3</option>
        </select>
      </div>
      <div className="menu-item">
        <span className="menu-label">Settings</span>
      </div>
    </div>
  );
};

export default MenuBar;