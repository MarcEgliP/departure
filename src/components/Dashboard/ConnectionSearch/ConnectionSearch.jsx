import "bootstrap-icons/font/bootstrap-icons.css";
import {SelectDropdown} from "./SelectDropdown/SelectDropdown";
import React, {useState} from "react";
import {findConnections, saveFavouriteCall} from "./ConnectionsSearch.service";
import {Spinner} from "react-bootstrap";
import "./ConnectionsSearch.css";
import {BsArrowRight, BsFillStarFill, BsStar} from "react-icons/bs";
import {deleteFavorite, retrieveFavorites} from "../dashboard-service";
import {SearchResult} from "./SearchResult/SearchResult";
import {useTranslation} from "react-i18next";


export function ConnectionSearch({setFavorites}) {
    const [stations, setStations] = useState([]);
    const [connections, setConnections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [favorite, setFavorite] = useState(-1);
    const { t } = useTranslation();

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

        setFavoriteValue()
    }
    const toggleFavourite = async () => {
        if (stations.length < 2) return;
        const stationsNames = stations.map(e => e.value)
        if (favorite !== -1) {
            await deleteFavorite(favorite);
            retrieveFavorites().then((response) => {
                setFavorites(response.data);
            });
            setFavorite(-1)
        } else {
            await saveFavouriteCall(stationsNames[0], stationsNames[stations.length - 1])
                .then(() => setFavoriteValue());
            retrieveFavorites().then((response) => {
                setFavorites(response.data);
            });
        }
    }
    const setFavoriteValue = () => {
        const stationsNames = stations.map(e => e.value)
        retrieveFavorites()
            .then(e => e.data)
            .then(e => e.filter(s =>
                s.from === stationsNames[0] && s.to === stationsNames[1]
            ))
            .then(e => setFavorite(e.length > 0 ? e[0].id : -1))
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center flex-column m-5">
                    <p className="lead display-6">{t("search_connection", {keyPrefix: "search"})}</p>
                    <div className="d-flex gap-4 justify-content-center align-items-center w-100">
                        <SelectDropdown onOptionSelect={(value) => handleSelect(value, 0)}
                                        placeholderTag={t("from", {keyPrefix: "search"})}></SelectDropdown>
                        <BsArrowRight className="display-6 mt-3"></BsArrowRight>
                        <SelectDropdown onOptionSelect={(value) => handleSelect(value, 1)}
                                        placeholderTag={t("to", {keyPrefix: "search"})}></SelectDropdown>
                        <div className="d-flex mt-3 align-items-center" onClick={toggleFavourite}>
                            {
                                favorite !== -1 ?
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
                            <div className="accordion" id="searchAccordion" key={index}>
                                <SearchResult connection={connection} index={index}></SearchResult>
                            </div>)
                    }
                </div>
            </div>
        </>
    );
}