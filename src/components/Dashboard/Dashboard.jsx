import {Navbar} from "../Navbar/Navbar";
import {ListRow} from "./ListRow/ListRow";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, {useEffect, useState} from "react";
import {retrieveFavorites} from "./dashboard.service";
import {getPersonalInformation} from "../../helpers/storage";
import {Navigate, useSearchParams} from "react-router-dom";
import {Modal} from "./Modal/Modal";
import {ConnectionSearch} from "./ConnectionSearch/ConnectionSearch";
import "./Dashboard.css"
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

export function Dashboard({isLoggedIn}) {
    const [favorites, setFavorites] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [favoriteId, setFavoriteId] = useState(-1);
    const {t} = useTranslation();

    useEffect(() => {
        retrieveFavorites().then((response) => {
            setFavorites(response.data);
        })
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <>
            <Navbar/>
            <Modal textToPresent={"Are you sure you want to delete this favoriteId?"}
                   modalTitle={"Delete favoriteId"}
                   setFavorites={setFavorites}
                   favorites={favorites}
                   favoriteId={favoriteId}
                   setFavoriteId={setFavoriteId}/>
            <div className={"d-flex flex-row"}>
                <div className={"col-6"}>
                    <h1 className={"display-3 m-5"}>{t("hello", {keyPrefix: 'welcome_texts'})} {getPersonalInformation().firstName}</h1>
                    <h3 className={"display-4 mx-5"}>{t("saved_connections", {keyPrefix: 'connections'})}</h3>
                    <div className="accordion mx-5 mb-5 overflow-auto fav-container" id="accordionConnections">
                        {
                            favorites.map((favorite, index) =>
                                <div className="d-flex flex-row align-items-start" key={"list-row" + index}>
                                    <ListRow
                                        searchParams={searchParams}
                                        setSearchParams={setSearchParams}
                                        from={favorite.from}
                                        to={favorite.to}
                                        key={favorite.id}/>
                                    <i className="bi bi-trash-fill fs-1 mx-5 mt-2 trashIcon"
                                       data-bs-toggle="modal"
                                       data-bs-target="#staticBackdrop"
                                       key={"trashIcon" + index}
                                       onClick={() => setFavoriteId(favorite.id)}
                                    ></i>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="d-flex">
                    <div className="vr"></div>
                </div>
                <div className="col-6">
                    <ConnectionSearch setFavorites={setFavorites} setFavorite={setFavoriteId} favorite={favoriteId}/>
                </div>
            </div>
        </>
    );
}

Dashboard.propTypes = {
    isLoggedIn: PropTypes.bool
};
