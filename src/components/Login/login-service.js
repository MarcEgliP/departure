import axios from "axios";

export function retrieveToken(email, password) {
    return axios.post('https://departure-api-wa.azurewebsites.net/api/login', {"email": email, "password": password});
}