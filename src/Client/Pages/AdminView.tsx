import React, { useState } from "react";
import './AdminView.css'; 

interface AdminViewProps {
  org: string;
}

const AdminView: React.FunctionComponent<AdminViewProps> = ({ org }) => {
    const filters: string[] = ['Currency', 'Email', 'EIN', 'SSN', 'Phone', 'Keyword(s)'];
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState('');
    const [entries, setEntries] = useState<{ keyword: string; type: string }[]>([]);

    console.log('selected filters: ', selectedFilters);

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
        setEntries([...entries, { keyword, type }]);
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
