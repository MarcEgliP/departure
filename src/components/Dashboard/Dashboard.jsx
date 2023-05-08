import {Navbar} from "../Navbar/Navbar";
import {ListRow} from "./ListRow/ListRow";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useEffect, useState} from "react";
import {retrieveFavorites} from "./dashboard-service";
import {getPersonalInformation} from "../../helpers/storage";
import {Navigate, useSearchParams} from "react-router-dom";
import {ConnectionSearch} from "./ConnectionSearch/ConnectionSearch";
import "./Dashboard.css"

export function Dashboard({isLoggedIn}) {
    const [favorites, setFavorites] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

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
            <div className={"d-flex flex-row"}>
                <div className={"col-6 border border-primary"}>
                    <h1 className={"display-3 m-5"}>Hallo {getPersonalInformation().firstName}</h1>
                    <h3 className={"display-4 mx-5"}>Gespeicherte Verbindungen</h3>
                    <div className="accordion mx-5 mb-5 overflow-auto fav-container" id="accordionConnections">
                        {
                            favorites.map((favorite => <ListRow
                                searchParams={searchParams}
                                setSearchParams={setSearchParams}
                                from={favorite.from}
                                to={favorite.to}
                                key={favorite.id}/>))
                        }
                    </div>
                </div>
                <div className="col-6 border border-danger">
                    <ConnectionSearch></ConnectionSearch>
                </div>
            </div>
        </>
    );
}