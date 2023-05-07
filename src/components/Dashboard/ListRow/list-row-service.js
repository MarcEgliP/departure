import axios from "axios";

export function retrieveConnections(from, to) {
    return axios.get('http://transport.opendata.ch/v1/connections',
        {params: {from: from, to: to}});
}