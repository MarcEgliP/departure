import React, {useEffect, useState} from "react";
import {retrieveConnections, retrieveConnectionsOfTomorrow} from "./list-row-service";
import {Connection} from "./Connection/Connection";
import {BsArrowRight} from "react-icons/bs";
import {MINUTE_IN_MILLISECONDS} from "../../../helpers/constants-library";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

export function ListRow({from, to, searchParams, setSearchParams}) {
    const [availableConnections, setAvailableConnections] = useState([]);
    const [showDataOfTomorrow, setShowDataOfTomorrow] = useState(false);
    const {t} = useTranslation();

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
        loadConnections();
        const interval = setInterval(async () => {
            loadConnections();
        }, MINUTE_IN_MILLISECONDS);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="accordion-item w-75">
                <h2 className="accordion-header" id="headingOne">
                    <button onClick={insertQueryParams} className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#" + from + to}>
                        <div className="d-flex flex-row w-100">
                            <h1 className="w-75">{from} <BsArrowRight className="display-6"></BsArrowRight> {to}</h1>
                            <h1 className="w-25">
                                <i className="bi bi-train-front-fill fs-4">
                                        {showDataOfTomorrow ? t("tomorrow",{keyPrefix: "time"}): t("today",{keyPrefix: "time"})}
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

ListRow.propTypes = {
    from: PropTypes.any,
    to: PropTypes.any,
    searchParams: PropTypes.any,
    setSearchParams:PropTypes.func
};