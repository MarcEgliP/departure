import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Dashboard} from "./Dashboard";
import {Login} from "./Login";

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
