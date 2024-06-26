import React, { useState, useEffect } from "react";
import "./AdminView.css";
import axios from "axios";
import copy from "../../Assets/copypastevector.png";
import { useNavigate } from "react-router-dom";

interface entries {
    keyword: string;
    type: string;
}

interface Entry {
    keyword: string;
    type: string;
}

interface AdminViewProps {
    org: string;
    config: any;
    settings: string[];
    initialEntries: entries[];
}

interface submitObj {
    currency: boolean;
    email: boolean;
    ein: boolean;
    ssn: boolean;
    phone: boolean;
    keyword: boolean;
    key: string;
    entries: entries[];
}

const AdminView: React.FunctionComponent<AdminViewProps> = ({
    org,
    config,
    settings,
    initialEntries,
}) => {
    const navigate = useNavigate();
    const filters: string[] = [
        "Currency",
        "Email",
        "EIN",
        "SSN",
        "Phone",
        "Keyword(s)",
    ];
    const [selectedFilters, setSelectedFilters] = useState<string[]>(settings);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [entries, setEntries] =
        useState<{ keyword: string; type: string }[]>(initialEntries);

    useEffect(() => {
        async function submitConfig() {
            const initial: submitObj = {
                currency: false,
                email: false,
                ein: false,
                ssn: false,
                phone: false,
                keyword: false,
                key: org,
                entries: entries,
            };

            if (selectedFilters.includes("Currency")) initial.currency = true;
            if (selectedFilters.includes("Email")) initial.email = true;
            if (selectedFilters.includes("EIN")) initial.ein = true;
            if (selectedFilters.includes("SSN")) initial.ssn = true;
            if (selectedFilters.includes("Phone")) initial.phone = true;
            if (selectedFilters.includes("Keyword(s)")) initial.keyword = true;

            const response = axios.post(
                "http://localhost:3000/config/submit",
                initial
            );
        }

        submitConfig();
    }, [selectedFilters, entries]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter]
        );
    };

    interface keyword {
        type: string;
        keyword: string;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim() && type.trim()) {
            setEntries([
                ...entries.filter((entr) => entr.keyword !== keyword),
                { keyword, type },
            ]);
            setKeyword("");
            setType("");
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // alert(`Copied to clipboard!`);
        } catch (err) {
            console.error("Failed to copy: ", err);
            alert("Failed to copy to clipboard. Please try again manually.");
        }
    };

    const handleDelete = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    return (
        <div className="mainContainer">
            <h2>SETTINGS</h2>
            <div className="adminSplitScreen">
                <div className="leftSection">
                    <h3>Organization Key</h3>
                    <div className="orgAndButton">
                        <input className="orgKey" value={org} readOnly></input>
                        <div
                            className="copy"
                            onClick={() => copyToClipboard(org)}
                            style={{ backgroundImage: `url(${copy})` }}></div>
                    </div>
                    <button
                        className="button2"
                        id="workerButton"
                        onClick={() => navigate("/signup")}>
                        Create Worker Account
                    </button>
                    <h3>Redaction Settings</h3>
                    <ul className="filterList">
                        {filters.map((filter) => (
                            <li key={filter} className="filterItem">
                                <input
                                    className="filterCheckbox"
                                    type="checkbox"
                                    value={filter}
                                    checked={selectedFilters.includes(filter)}
                                    onChange={() => handleFilterChange(filter)}
                                />{" "}
                                {filter}
                            </li>
                        ))}
                    </ul>
                    <h3>Add Keyword and Category:</h3>
                    <form className="keywordForm" onSubmit={handleSubmit}>
                        <div className="filterLine">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Enter Keyword"
                            />
                        </div>
                        <div className="filterLine">
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="Enter Category"
                            />
                        </div>
                        <button
                            type="submit"
                            className="button2"
                            id="workerButton">
                            Add
                        </button>
                    </form>
                </div>

                <div className="rightSection">
                    <div className="entryHeader">
                        <h3>Keyword</h3>
                        <h3>Category</h3>
                    </div>
                    {entries.length > 0 && (
                        <ul className="filterList">
                            <div className="entryColumn">
                                {entries
                                    .sort((a, b) => {
                                        // Compare by type first
                                        if (a.type < b.type) return -1;
                                        if (a.type > b.type) return 1;

                                        // If types are the same, compare by keyword
                                        if (a.keyword < b.keyword) return -1;
                                        if (a.keyword > b.keyword) return 1;

                                        return 0; // Objects are equal
                                    })
                                    .map((entry, index) => (
                                        <li key={index} className="entry-item">
                                            <div className="keywordEntry">
                                                {entry.keyword}
                                            </div>
                                            <div className="typeEntry">
                                                {entry.type}
                                            </div>
                                            <div className="deleteEntry">
                                                <button
                                                    className="deleteButton"
                                                    onClick={() =>
                                                        handleDelete(index)
                                                    }>
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                            </div>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminView;
