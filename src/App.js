import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard} from "./components/Dashboard/Dashboard";
import {Login} from "./components/Login/Login";
import "./helpers/interceptor.js"
import {tokenIsPresent} from "./helpers/storage";
import {useEffect, useState} from "react";

function App() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(tokenIsPresent());

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={() => setIsLoggedIn(true)} />}/>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

export default App;