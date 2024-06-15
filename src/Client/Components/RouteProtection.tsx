import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

interface RouteProtectionProps {
    children: React.ReactNode;
}

const RouteProtection: React.FC<RouteProtectionProps> = ({ children }) => {
    const [permission, setPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchTokenStatus = async () => {
            try {
                console.log("Attempting to fetch token status...");
                const response = await axios.get(
                    "http://localhost:3000/checkToken",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                console.log("Response:", response);

                if (response.status === 200) {
                    setPermission(true);
                } else {
                    setPermission(false);
                }
            } catch (error) {
                console.error("Error checking token:", error);
                setPermission(false);
            }
        };

        fetchTokenStatus();
    }, []);

    if (permission === null) {
        return <div>Loading...</div>;
    } else if (permission === false) {
        return <Navigate to="/" />;
    } else {
        return <>{children}</>;
    }
};

export default RouteProtection;
