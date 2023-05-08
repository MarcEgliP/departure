import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import history from "./helpers/history";
import "./custom.scss"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HistoryRouter history={history}>
            <App/>
        </HistoryRouter>
    </React.StrictMode>
);
reportWebVitals();
