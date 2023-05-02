import './App.css';
import {Route, Routes, BrowserRouter, redirect} from "react-router-dom";
import {Dashboard} from "./Dashboard";
import {Login} from "./Login/Login";
import "./helpers/interceptor.js"
import {getToken} from "./helpers/storage";

function App() {
    if(!getToken()){
        redirect("/")
    }
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;