import axios from "axios";

export function searchOptions(value) {
    return axios.get('https://transport.opendata.ch/v1/locations?type=station&query='+value);
}