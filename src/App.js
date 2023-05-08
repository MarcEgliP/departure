import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {Login} from "./components/Login/Login";
import "./helpers/interceptor.js"
import {tokenIsPresent} from "./helpers/storage";
import React, {useState} from "react";
import "./i18n"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(tokenIsPresent());
    return (
        <Routes>
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={() => setIsLoggedIn(true)}/>}/>
            <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn}/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;