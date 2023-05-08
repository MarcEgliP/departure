import "bootstrap-icons/font/bootstrap-icons.css";
import {SelectDropdown} from "./SelectDropdown/SelectDropdown";
import {useState} from "react";
import {findConnections, saveFavouriteCall} from "./ConnectionsSearch.service";
import {ListRow} from "../ListRow/ListRow";
import {Spinner} from "react-bootstrap";
import "./ConnectionsSearch.css";

export function ConnectionSearch() {
    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (value, pos) => {
        let nextStations = stations;
        nextStations.splice(pos, 1, value);
        setStations(nextStations)
        console.log(stations)
    }
    const submit = () => {
        const stationsNames = stations.map(e => e.value)
        setIsLoading(true)
        findConnections(stationsNames[0], stationsNames[stations.length - 1])
            .then(result => result.data.connections)
            .then(connections => setConnections(connections))
            .finally(() => setIsLoading(false))
    }
    const saveFavorite = () => {
        const stationsNames = stations.map(e => e.value)
        saveFavouriteCall(stationsNames[0], stationsNames[stations.length - 1])
    }

    return (
        <>
            <SelectDropdown onOptionSelect={(value) => handleSelect(value, 0)}></SelectDropdown>
            <SelectDropdown onOptionSelect={(value) => handleSelect(value, 1)}></SelectDropdown>
            {/*TODO inplement disabled check*/}
            <button className="btn btn-outline-primary" onClick={submit}>Submit</button>
            <button className="btn btn-outline-primary" onClick={saveFavorite}>Favorite</button>
            <div>
                {isLoading ?
                    <div className="d-flex justify-content-center align-items-center h-100%">
                        <Spinner animation="border" className="s-7em" />
                    </div> :
                    connections.map((connection, index) => <ListRow
                        from={connection.from.station.name}
                        to={connection.to.station.name}
                        key={index}></ListRow>)
                }
            </div>
        </>
    );
}