import React from "react";
import "./App.css";
// import Landing from './Pages/Landing';
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminView from "./Pages/AdminView";
import Navigation from "./Components/Navigation";
import ErrorBoundary from "./Components/ErrorBoundary";

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
  const [orgKey, setOrgKey] = useState<string>("");
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

  console.log("settings in App: ", settings);

  function setOrg(org: string) {
    setOrgKey(org);
  }

  function setConfiguration(conf: any) {
    setConfig(conf);
  }

  return (
    <div>
      <Router>
        <Navigation loggedIn={loggedIn} />
        <Routes>
          {/* <Route path="/login" element={<Login key = 'Login' configFunc = {setConfiguration} orgFunc={setOrg}/>} /> */}
          <Route path="/main" element={<Main key="Main" orgKey={orgKey} />} />
          <Route
            path="/"
            element={
              <Login
                key="Login"
                configFunc={setConfiguration}
                orgFunc={setOrg}
              />
            }
          />

          {/* <Route path="/" element={<Landing key = 'Landing'/>} /> */}
          <Route
            path="/signup"
            element={<Signup key="Signup" orgFunc={setOrg} />}
          />
          <Route
            path="/adminview"
            element={
              <AdminView
                key="AdminView "
                initialEntries={config.entries}
                settings={settings}
                config={config}
                org={orgKey}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
