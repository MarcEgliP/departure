import {useEffect, useState} from "react";
import {retrieveConnections} from "./list-row-service";
import {Connection} from "./Connection/Connection";

export function ListRow({from, to, searchParams, setSearchParams}) {
    const [availableConnections, setAvailableConnections] = useState([]);

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

    useEffect(() => {
        retrieveConnections(from, to)
            .then((response) => {
                setAvailableConnections(response.data.connections);
            });
    }, []);

    return (
        <>
            <div className="accordion-item w-75">
                <h2 className="accordion-header" id="headingOne">
                    <button onClick={insertQueryParams} className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#" + from + to}>
                        <h1>{from} -> {to}</h1>
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