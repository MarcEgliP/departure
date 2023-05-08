import {useEffect, useState} from "react";
import {retrieveConnections, retrieveConnectionsOfTomorrow} from "./list-row-service";
import {Connection} from "./Connection/Connection";

export function ListRow({from, to, searchParams, setSearchParams}) {
    const [availableConnections, setAvailableConnections] = useState([]);
    const [showDataOfTomorrow, setShowDataOfTomorrow] = useState(false);

    function checkIfShow() {
        return searchParams.get("connection") !== null && (searchParams.get("connection").includes(from)
            && searchParams.get("connection").includes(to));
    }

    function insertQueryParams() {
        if (!checkIfShow()) {
            setSearchParams({connection: from + to});
            return;
        }
        setSearchParams({connection: ""});
    }

    function loadConnections() {
        retrieveConnections(from, to)
            .then((response) => {
                if (response.data.connections.length === 0) {
                    retrieveConnectionsOfTomorrow(from, to)
                        .then((responseTomorrow) => {
                            setShowDataOfTomorrow(true);
                            setAvailableConnections(responseTomorrow.data.connections);
                        });
                }
                setAvailableConnections(response.data.connections);
            });
    }

    useEffect(() => {
        loadConnections();
        // const interval = setInterval(async () => {
        //     loadConnections();
        // }, MINUTE_IN_MILLISECONDS);

        // return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="accordion-item w-75">
                <h2 className="accordion-header" id="headingOne">
                    <button onClick={insertQueryParams} className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#" + from + to}>
                        <div className="d-flex flex-row w-100">
                                <h1 className="w-75">{from} -> {to}</h1>
                                <h1 className="w-25">
                                    <i className="bi bi-train-front-fill fs-4">
                                        {showDataOfTomorrow ? "Morgen" : "Heute"}
                                    </i>
                                </h1>
                        </div>
                    </button>
                </h2>
                <div id={from + to}
                     className={checkIfShow() ? "accordion-collapse show" : "accordion-collapse collapse"}
                     aria-labelledby="headingOne"
                     data-bs-parent="#accordionConnections">
                    <div className="accordion-body">
                        {
                            availableConnections.map((connection, index) =>
                                <div className="accordion" id="accordionDepartures" key={"accordion" + index}>
                                    <Connection
                                        connection={connection}
                                        index={index}
                                        key={index}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}