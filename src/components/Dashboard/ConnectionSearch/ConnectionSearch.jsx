import "bootstrap-icons/font/bootstrap-icons.css";
import {SelectDropdown} from "./SelectDropdown/SelectDropdown";
import {useState} from "react";
import {findConnections} from "./ConnectionsSearch.service";
import {ListRow} from "../ListRow/ListRow";

export function ConnectionSearch() {
    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);

    const handleSelect = (value, pos) => {
        let nextStations = stations;
        nextStations.splice(pos, 1, value);
        setStations(nextStations)
        console.log(stations)
    }
    const submit = () => {
        const stationsNames = stations.map(e => e.value)
        findConnections(stationsNames[0], stationsNames[stations.length - 1])
            .then(result => result.data.connections)
            .then(connections => setConnections(connections))
    }
    return (
        <>
            <SelectDropdown onOptionSelect={(value) => handleSelect(value, 0)}></SelectDropdown>
            <SelectDropdown onOptionSelect={(value) => handleSelect(value, 1)}></SelectDropdown>
            {/*TODO inplement disabled check*/}
            <button className="btn btn-outline-primary" onClick={submit}>Submit</button>
            <button className="btn btn-outline-primary" onClick={submit}>Favorite</button>
            <div>
                {
                    connections && connections.map((connection, index) => <ListRow
                        from={connection.from.station.name}
                        to={connection.to.station.name}
                        key={index}
                       />)
                }
            </div>
        </>
    );
}