import {Button} from "react-bootstrap";
import './Login.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {processLoginResponse} from "../../helpers/storage";
import {retrieveToken} from "./login-service";

export function Login({isLoggedIn, setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);

    const handleSubmit = () => {
        retrieveToken(email, password)
            .then(res => {
                setIsLoggedIn();
                setShowError(false);
                processLoginResponse(res.data);
                navigate("/");
            })
            //TODO: Päscu fragen ob Error auch dann nicht gezeigt wenn von User verschuldet
            .catch(() => {
                setShowError(true);
            });
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
            {
                showError &&
                <div className="alert alert-danger mt-5" role="alert">
                    Email or password invalid
                </div>
            }
        </div>
    )
}