import axios from "axios";

export function findConnections(from, to) {
    return axios.get(`http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`);
}
export function saveFavouriteCall(from, to){
    axios.post("http://localhost:4242/api/connections", {"from":from, "to": to })
}
