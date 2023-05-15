import axios from "axios";
import {getToken} from "./storage";
import history from "./history"
axios.interceptors.request.use(
    function (config) {
        if(!config.url.includes("/transport.opendata.ch")){
            config.headers = {...config.headers, 'x-access-token': getToken()}
            config.url = process.env.REACT_APP_URL + config.url
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
        if(error?.response?.status === 401){
            history.push("/login");
        }
        return Promise.reject(error);
    }
);