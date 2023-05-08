import axios from "axios";

export function retrieveFavorites() {
    return axios.get('http://localhost:4242/api/connections');
}

export function deleteFavorite(id) {
    return axios.delete('http://localhost:4242/api/connections/' + id);
}