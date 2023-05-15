import axios from "axios";

export function retrieveFavorites() {
    return axios.get("/api/connections");
}

export function deleteFavorite(id) {
    return axios.delete("/api/connections/" + id);
}