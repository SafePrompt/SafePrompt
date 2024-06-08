import React, { useState, useEffect } from "react";
import './AdminView.css'; 
import axios from 'axios';



interface entries {
  keyword: string,
  type: string
}

interface Entry {
  keyword: string,
  type: string
}

interface AdminViewProps {
  org: string;
  config: any;
  settings: string[],
  initialEntries: entries[]
}

interface submitObj {
  currency: boolean,
  email: boolean,
  ein: boolean,
  ssn: boolean,
  phone: boolean,
  keyword: boolean
  key: string
  entries: entries[]
}

const AdminView: React.FunctionComponent<AdminViewProps> = ({ org, config, settings, initialEntries }) => {
    const filters: string[] = ['Currency', 'Email', 'EIN', 'SSN', 'Phone', 'Keyword(s)'];
    const [selectedFilters, setSelectedFilters] = useState<string[]>(settings);
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState('');
    const [entries, setEntries] = useState<{ keyword: string; type: string }[]>(initialEntries);

    useEffect(()=>{

      async function submitConfig(){

      const initial: submitObj = {
        currency: false,
        email: false,
        ein: false,
        ssn: false,
        phone: false,
        keyword: false,
        key: org,
        entries: entries
      }

      if (selectedFilters.includes('Currency')) initial.currency = true;
      if (selectedFilters.includes('Email')) initial.email = true;
      if (selectedFilters.includes('EIN')) initial.ein = true;
      if (selectedFilters.includes('SSN')) initial.ssn = true;
      if (selectedFilters.includes('Phone')) initial.phone = true;
      if (selectedFilters.includes('Keyword(s)')) initial.keyword = true;

      console.log('initial:', initial)

      const response = axios.post('http://localhost:3000/config/submit', initial)

      console.log('after response from initial')
    }

    submitConfig()







    }, [selectedFilters, entries])

    const handleFilterChange = (filter: string) => {
      setSelectedFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((item) => item !== filter)
          : [...prev, filter]
      );
    };

    console.log('entries state: ', entries);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (keyword.trim() && type.trim()) {
        setEntries([...entries.filter((entr)=>entr.keyword !== keyword), { keyword, type }]);
        setKeyword('');
        setType('');
      }
    };

    const handleDelete = (index: number) => {
      setEntries(entries.filter((_, i) => i !== index));
    };

    return (
      <div>
        <h2>Admin View</h2>
        <h3>Organization Key</h3>
        <input className='orgKey' value={org} readOnly></input>
        <h3>Filters:</h3>
        <ul className="no-bullets">
          {filters.map((filter) => (
            <li key={filter} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  value={filter}
                  checked={selectedFilters.includes(filter)}
                  onChange={() => handleFilterChange(filter)}
                />
                {' '}{filter}
              </label>
            </li>
          ))}
        </ul>
        <p>Selected filters: {selectedFilters.join(', ') || 'None'}</p>
  
        <h3>Add Keyword and Type:</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Keyword:
              <input 
                type="text" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Enter keyword"
              />
            </label>
          </div>
          <div>
            <label>
              Type:
              <input 
                type="text" 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                placeholder="Enter type"
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
  
        {entries.length > 0 && (
          <>
            <h3>Entries:</h3>
            <ul className="no-bullets">
              {entries.map((entry, index) => (
                <li key={index} className="entry-item">
                  Keyword: <strong>{entry.keyword}</strong>, Type: <strong>{entry.type}</strong>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
};

export default AdminView;
