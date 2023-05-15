import axios from "axios";

export function retrieveFavorites() {
    return axios.get('https://departure-api-wa.azurewebsites.net/api/connections');
}

export function deleteFavorite(id) {
    return axios.delete('https://departure-api-wa.azurewebsites.net/api/connections/' + id);
}