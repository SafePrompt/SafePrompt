import React from 'react';

interface InputBox {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
  }

const InputBox: React.FunctionComponent = ({ label, placeholder, value, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      };

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
        type="text"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
            />
        </div>
    )
}

export default InputBox;