import axios from "axios";

export function findConnections(from, to) {
    return axios.get(`http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`);
}