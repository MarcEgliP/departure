import axios from "axios";

export function retrieveToken(email, password) {
    return axios.post('/api/login', {"email": email, "password": password});
}