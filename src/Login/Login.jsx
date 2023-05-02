import {Button} from "react-bootstrap";
import './login.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setToken} from "../helpers/storage";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.post('/api/login', {"email": email, "password": password})
            .then(res => {
                setToken(res.data.token);
                navigate("/");
            })
    }
    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <p className="display-4">Sign in</p>
            <input type="email" className="form-control m-2 w-50 " id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="form-control m-2 w-50 " onChange={e => setPassword(e.target.value)}
                   placeholder="Enter password"/>
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}