import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

interface RouteProtectionProps {
    children: React.ReactNode;
    setConfig: (conf: any) => void; // Example type, adjust as per your actual types
    setOrgKey: (orgKey: string) => void; // Example type, adjust as per your actual types
}

const RouteProtection: React.FC<RouteProtectionProps> = ({
    children,
    setConfig,
    setOrgKey,
}) => {
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

                console.log("Response.data:", response.data);

                if (response.status === 200) {
                    setPermission(true);
                    setOrgKey(response.data.orgKey);
                    setConfig(response.data.config);
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
        return <Navigate to="/login" />;
    } else {
        return <>{children}</>;
    }
};

export default RouteProtection;
