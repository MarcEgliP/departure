import "bootstrap-icons/font/bootstrap-icons.css";
import {SelectDropdown} from "./SelectDropdown/SelectDropdown";
import {useState} from "react";
import {findConnections, saveFavouriteCall} from "./ConnectionsSearch.service";
import {Spinner} from "react-bootstrap";
import "./ConnectionsSearch.css";
import {BsArrowRight, BsFillStarFill, BsStar} from "react-icons/bs";
import {retrieveFavorites} from "../dashboard-service";
import {SearchResult} from "./SearchResult/SearchResult";

export function ConnectionSearch() {
    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const handleSelect = (value, pos) => {
        let nextStations = stations;
        nextStations.splice(pos, 1, value);
        setStations(nextStations)
        if (stations.length >= 2) {
            submit()
        }
    }
    const submit = () => {
        const stationsNames = stations.map(e => e.value)
        setIsLoading(true)
        findConnections(stationsNames[0], stationsNames[stations.length - 1])
            .then(result => result.data.connections)
            .then(connections => setConnections(connections))
            .finally(() => setIsLoading(false))

        retrieveFavorites()
            .then(e => e.data)
            .then(e => e.map(fav => [fav.from, fav.to]))
            .then(e => JSON.stringify(e))
            .then(e => setFavorite(e.includes(JSON.stringify(stationsNames))));
    }
    const toggleFavourite = () => {
        if (stations.length < 2) return;
        const stationsNames = stations.map(e => e.value)

        if (!favorite) {
            //TODO call to delete
        } else {
            saveFavouriteCall(stationsNames[0], stationsNames[stations.length - 1])
        }
        setFavorite(!favorite)
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center flex-column m-5">
                    <p className="lead display-6">Search connection</p>
                    <div className="d-flex gap-4 justify-content-center align-items-center w-100">
                        <SelectDropdown onOptionSelect={(value) => handleSelect(value, 0)}
                                        placeholderTag="From"></SelectDropdown>
                        <BsArrowRight className="display-6 mt-3"></BsArrowRight>
                        <SelectDropdown onOptionSelect={(value) => handleSelect(value, 1)}
                                        placeholderTag="To"></SelectDropdown>
                        <div className="d-flex mt-3 align-items-center" onClick={toggleFavourite}>
                            {
                                favorite ?
                                    <BsFillStarFill className="favIcon"></BsFillStarFill> :
                                    <BsStar className="favIcon starIcon"></BsStar>
                            }
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center flex-column mt-5 w-75">
                    {isLoading ?
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <Spinner animation="border" className="s-7em mt-5"/>
                        </div> :
                        connections.map((connection, index) =>
                            <div className="accordion" id="searchAccordion">
                                <SearchResult connection={connection} index={index}/>
                            </div>)
                    }
                </div>
            </div>
        </>
    );
}