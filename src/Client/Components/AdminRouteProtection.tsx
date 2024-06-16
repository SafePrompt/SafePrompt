import axios from "axios";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

interface RouteProtectionProps {
    children: React.ReactNode;
    setConfig: (conf: any) => void;
    setOrgKey: (orgKey: string) => void;
    setGlobalUsername: (globalUsername: string | null) => void;
    setStorage: (storage: any) => void;
    setAdmin: (admin: boolean) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setPermission: (permission: boolean | null) => void;
    permission: boolean | null;
}

const RouteProtection: React.FC<RouteProtectionProps> = ({
    children,
    setConfig,
    setOrgKey,
    setGlobalUsername,
    setStorage,
    setAdmin,
    setLoggedIn,
    setPermission,
    permission,
}) => {
    // const [permission, setPermission] = useState<boolean | null>(null);

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

                console.log("Response.data.admin:", response.data.admin);

                if (response.status === 200 && response.data.admin) {
                    setPermission(true);
                    setOrgKey(response.data.orgKey);
                    setConfig(response.data.config);
                    setGlobalUsername(response.data.username);
                    setAdmin(response.data.admin);
                    setStorage(response.data.prompts);
                    setLoggedIn(true);
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

    console.log("permission status:", permission);

    if (permission === null) {
        return <div>Loading...</div>;
    } else if (permission === false) {
        console.log("about to navigate");
        setPermission(null);
        return <Navigate to="/" />;
    } else {
        console.log("about to render child");
        return <>{children}</>;
    }
};

export default RouteProtection;
