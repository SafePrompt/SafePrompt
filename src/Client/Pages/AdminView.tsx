// √ checkbox for each filter field
// submit button
// keyword entry option (Keyword/type)

import React, { useState } from "react";

const AdminView: React.FunctionComponent = () => {
    const filters: string[] = ['Currency', 'Email', 'EIN', 'SSN', 'Phone', 'Keyword(s)']
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleFilterChange = (filter: string) => {
      setSelectedFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((item) => item !== filter)
          : [...prev, filter]
      );
    };

  return (
    <><div>AdminView</div>
    <h3>Filters:</h3><ul>
      {filters.map((filter) => (
        <li key={filter}>
          <label>
            <input
              type="checkbox"
              value={filter}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterChange(filter)} />
            {' '}{filter}
          </label>
        </li>
      ))}
    </ul><p>Selected filters: {selectedFilters.join(', ') || 'None'}</p></>
  )
}

export default AdminView