import {useEffect, useState} from "react";
import {retrieveConnections} from "./list-row-service";
import {Connection} from "./Connection/Connection";

export function ListRow({from, to}) {
    const [availableConnections, setAvailableConnections] = useState([]);

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
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#" + from + to}>
                        {from} -> {to}
                    </button>
                </h2>
                <div id={from + to} className="accordion-collapse collapse" aria-labelledby="headingOne"
                     data-bs-parent="#accordionConnections">
                    <div className="accordion-body">
                        {
                            availableConnections.map((connection, index) =>
                                <Connection
                                    connection={connection}
                                    key={index}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}