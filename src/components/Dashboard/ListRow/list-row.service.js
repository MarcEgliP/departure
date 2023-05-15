import axios from "axios";
import moment from "moment";

export function retrieveConnections(from, to) {
    return axios.get('https://transport.opendata.ch/v1/connections',
        {params: {from: from, to: to}});
}

export function retrieveConnectionsOfTomorrow(from, to) {
    const todayMoment = moment();
    const tomorrowMoment = todayMoment.clone().add(1, 'days');
    return axios.get('https://transport.opendata.ch/v1/connections',
        {params: {from: from, to: to, date: tomorrowMoment.format("YYYY-MM-DD")}});
}