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
    // setPermission: (permission: boolean | null) => void;
    // permission: boolean | null;
}

const RouteProtection: React.FC<RouteProtectionProps> = ({
    children,
    setConfig,
    setOrgKey,
    setGlobalUsername,
    setStorage,
    setAdmin,
    setLoggedIn,
    // setPermission,
    // permission,
}) => {
    const [permission, setPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchTokenStatus = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/checkToken",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
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
                setPermission(false);
            }
        };

        fetchTokenStatus();
    }, []);

    if (permission === null) {
        return <div>Loading...</div>;
    } else if (permission === false) {
        // setPermission(null);
        return <Navigate to="/login" />;
    } else {
        return <>{children}</>;
    }
};

export default RouteProtection;
