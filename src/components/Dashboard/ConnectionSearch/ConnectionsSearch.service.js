import axios from "axios";

export function findConnections(from, to) {
    return axios.get(`https://transport.opendata.ch/v1/connections?from=${from}&to=${to}`);
}
export function saveFavouriteCall(from, to){
    return axios.post("/api/connections", {"from":from, "to": to })
}
