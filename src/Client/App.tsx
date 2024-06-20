import React, { useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import AdminView from "./Pages/AdminView";
import Navigation from "./Components/Navigation";
import RouteProtection from "./Components/RouteProtection";
import AdminRouteProtection from "./Components/AdminRouteProtection";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FunctionComponent = () => {
    interface entries {
        keyword: string;
        type: string;
    }

    interface configInterface {
        currency: boolean;
        ein: boolean;
        entries: entries[];
        id: number | string;
        key: string;
        keyword: boolean;
        email: boolean;
        phone: boolean;
        ssn: boolean;
    }

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [globalUsername, setGlobalUsername] = useState<string | null>(null);
    const [orgKey, setOrgKey] = useState<string>("");
    const [storage, setStorage] = useState<string[]>([]);
    const [admin, setAdmin] = useState<boolean>(false);
    const [permission, setPermission] = useState<boolean | null>(null);

    const [config, setConfig] = useState<configInterface>({
        currency: false,
        ein: false,
        entries: [],
        id: "",
        key: "",
        keyword: false,
        phone: false,
        ssn: false,
        email: false,
    });

    const settings = ["hello"];

    if (config.currency) settings.push("Currency");
    if (config.ein) settings.push("EIN");
    if (config.ssn) settings.push("SSN");
    if (config.phone) settings.push("Phone");
    if (config.email) settings.push("Email");
    if (config.keyword) settings.push("Keyword(s)");

    function setOrg(org: string) {
        setOrgKey(org);
    }

    function setConfiguration(conf: any) {
        setConfig(conf);
    }

    return (
        <div>
            <Router>
                <Navigation
                    permission={permission}
                    setLoggedIn={setLoggedIn}
                    admin={admin}
                    loggedIn={loggedIn}
                />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login
                                setLoggedIn={setLoggedIn}
                                key="Login"
                                configFunc={setConfiguration}
                                orgFunc={setOrg}
                                setGlobalUsername={setGlobalUsername}
                                setStorage={setStorage}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Signup
                                setLoggedIn={setLoggedIn}
                                key="Signup"
                                orgFunc={setOrg}
                                setGlobalUsername={setGlobalUsername}
                            />
                        }
                    />
                    <Route
                        path="/"
                        index
                        element={
                            <RouteProtection
                                // setPermission={setPermission}
                                // permission={permission}
                                setLoggedIn={setLoggedIn}
                                setAdmin={setAdmin}
                                setStorage={setStorage}
                                setOrgKey={setOrgKey}
                                setConfig={setConfig}
                                setGlobalUsername={setGlobalUsername}>
                                <Main
                                    setStorage={setStorage}
                                    key="Main"
                                    orgKey={orgKey}
                                    storage={storage}
                                    username={globalUsername}
                                />
                            </RouteProtection>
                        }
                    />
                    <Route
                        path="/adminview"
                        element={
                            <AdminRouteProtection
                                // <AdminRouteProtection
                                // setPermission={setPermission}
                                // permission={permission}
                                setLoggedIn={setLoggedIn}
                                setAdmin={setAdmin}
                                setStorage={setStorage}
                                setOrgKey={setOrgKey}
                                setConfig={setConfig}
                                // admin={admin}
                                setGlobalUsername={setGlobalUsername}>
                                <AdminView
                                    key="AdminView"
                                    initialEntries={config.entries}
                                    settings={settings}
                                    config={config}
                                    org={orgKey}
                                />
                            </AdminRouteProtection>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
