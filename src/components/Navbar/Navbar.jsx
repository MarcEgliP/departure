import React from 'react';
import {useTranslation} from "react-i18next";
import {clearToken} from "../../helpers/storage";
import {useNavigate} from "react-router-dom";

export function Navbar() {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const logOut = () => {
        navigate(`/login`);
        clearToken();
    }

    return (
        <>
            <nav
                className="w-100 d-flex flex-row navbar navbar-dark bg-dark navbar-collapse-sm navbar-expand-lg navbar-collapse-md navbar-collapse-sm">
                <div className="container-fluid d-flex">
                    <a className="navbar-brand fs-1" href="/">Departure</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active fs-4 " aria-current="page"
                                   href="#" onClick={logOut}>{t("logOut", {keyPrefix: "nav"})}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}