import axios from "axios";
import {getToken} from "./storage";

axios.interceptors.request.use(
    function (config) {
        //TODO: Päscu fragen was hier best practice
        if(!config.url.includes("/transport.opendata.ch")){
            config.headers = {...config.headers, 'x-access-token': getToken()}
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);