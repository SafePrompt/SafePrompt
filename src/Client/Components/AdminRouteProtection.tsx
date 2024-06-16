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
                console.log("Attempting to fetch ADMIN token status...");
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

                if (response.status === 200 && response.data.admin) {
                    console.log("200 and admin");
                    // Assuming your server sends back isAdmin to indicate admin status
                    setPermission(true);
                    setOrgKey(response.data.orgKey);
                    setConfig(response.data.config);
                    setGlobalUsername(response.data.username);
                    setStorage(response.data.prompts);
                    setAdmin(true); // Set admin state to true
                    setLoggedIn(true); // User is considered logged in
                } else {
                    setPermission(false);
                }
            } catch (error) {
                console.error("Error checking token:", error);
                setPermission(false);
            }
        };

        fetchTokenStatus();
    }, [
        setConfig,
        setOrgKey,
        setGlobalUsername,
        setStorage,
        setAdmin,
        setLoggedIn,
    ]);

    console.log("permission status:", permission);
    console.log;

    if (permission === null) {
        return <div>Loading...</div>;
    } else if (permission === false) {
        setPermission(null);
        return <Navigate to="/login" />;
    } else {
        setPermission(null);
        return <>{children}</>;
    }
};

export default RouteProtection;

// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// interface RouteProtectionProps {
//     children: React.ReactNode;
//     setConfig: (conf: any) => void;
//     setOrgKey: (orgKey: string) => void;
//     setGlobalUsername: (globalUsername: string | null) => void;
//     setStorage: (storage: any) => void;
//     setAdmin: (admin: boolean) => void;
//     setLoggedIn: (loggedIn: boolean) => void;
//     setPermission: (permission: boolean | null) => void;
//     permission: boolean | null;
//     admin: boolean;
// }

// const RouteProtection: React.FC<RouteProtectionProps> = ({
//     children,
//     setConfig,
//     setOrgKey,
//     setGlobalUsername,
//     setStorage,
//     setAdmin,
//     setLoggedIn,
//     setPermission,
//     permission,
//     admin,
// }) => {
//     // const [permission, setPermission] = useState<boolean | null>(null);

//     setPermission(null);
// };

// export default RouteProtection;
