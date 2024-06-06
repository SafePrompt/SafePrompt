// checkbox for each filter field
// submit button
// keyword entry option (Keyword/type)

import React, { useState } from "react";

const AdminView: React.FunctionComponent = () => {
    const filters: string[] = ['Currency', 'Email', 'EIN', 'SSN', 'Phone', 'Keyword(s)']
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div>AdminView</div>
  )
}

export default AdminView