import moment from "moment";

export function Connection({connection, index}) {

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#departure" + index}>
                        <div className="d-flex flex-row">
                            <div className="fs-3 w-100 d-flex flex-row">
                                <b className="d-flex">Verbindung: </b>
                                <i className="bi bi-clock ms-3">
                                    <i className="ms-3">
                                        {moment(connection.from.departure).format("hh:mm:ss")}
                                    </i>
                                </i>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id={"departure" + index} className="accordion-collapse collapse"
                     data-bs-parent="#accordionDepartures">
                    <div className="accordion-body d-flex flex-row fs-5">
                        <div className="w-50">
                            <p><b>Startstation: </b>{connection.from.station.name}</p>
                            <p><b>Verspätung  : </b>{connection.from.delay + " Minuten"}</p>
                            <p>
                                <b>Abfahrt in: </b>{moment(connection.from.departure).fromNow("hh:mm:ss")}
                            </p>
                        </div>
                        <div className="w-50">
                            <p><b>Endstation: </b>{connection.to.station.name}</p>
                            <p><b>Status: </b>{connection.from.delay === 0 ?
                                <i className="bi bi-circle-fill mx-2 text-success">
                                    <b className="mx-2 text-success">Keine Verspätung</b>
                                </i>
                                :
                                <i className="bi bi-circle-fill text-danger">
                                    <b className="mx-2 text-danger">Verspätung</b>
                                </i>
                            }</p>
                            <p><b>Plattform: </b>{connection.from.platform}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}