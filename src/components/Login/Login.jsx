import './Login.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {processLoginResponse} from "../../helpers/storage";
import {retrieveToken} from "./login-service";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

export function Login({isLoggedIn, setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {t} = useTranslation();

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
            .catch(() => {
                setShowError(true);
            });
    }
    return (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
            <p className="display-4 text-blue">{t("email", {keyPrefix: "form"})}</p>
            <input type="email" className="form-control m-2 w-50 " id="exampleInputEmail1" aria-describedby="emailHelp"
                   data-testid="input-email"
                   placeholder={t("email", {keyPrefix: "form"})} onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="form-control m-2 w-50 " onChange={e => setPassword(e.target.value)}
                   placeholder={t("password", {keyPrefix: "form"})} data-testid="input-password"/>
            <button onClick={handleSubmit} disabled={!email || !password} data-testid="submit" className="btn btn-outline-primary">
                Submit
            </button>
            {
                showError &&
                <div className="alert alert-danger mt-5" role="alert" data-testid="error">
                    {t("credentials_error", {keyPrefix: "alerts"})}
                    Email or password invalid
                </div>
            }
        </div>
    )
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool,
    setIsLoggedIn: PropTypes.func
};