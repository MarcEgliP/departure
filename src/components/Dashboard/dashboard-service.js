import axios from "axios";

export function retrieveFavorites() {
    return axios.get('http://localhost:4242/api/connections');
}