import {Navbar} from "../Navbar/Navbar";
import {ListRow} from "./ListRow";
import "bootstrap-icons/font/bootstrap-icons.css";
import {retrieveFavorites} from "./DashboardService";

export function Dashboard() {
    return (
        <>
            <Navbar/>
            <div className={"d-flex flex-row"}>
                <div className={"col-6 border border-primary"}>
                    <h1 className={"display-3 m-5"}>Hallo Robin</h1>
                    <h3 className={"display-6 mx-5"}>Gespeicherte Verbindungen</h3>
                    {
                        retrieveFavorites().map((favorite => <ListRow
                            from={favorite.from}
                            to={favorite.to}
                            key={favorite.id}/>))
                    }
                </div>
                <div className={"col-6 border border-danger"}>

                </div>
            </div>
        </>
    );
}