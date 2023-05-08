import moment from "moment";

export function Connection({connection, index}) {

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#departure" + index}>
                        <p className="fs-2"><b>Abfahrt: </b>{moment(connection.from.departure).fromNow()}</p>
                    </button>
                </h2>
                <div id={"departure" + index} className="accordion-collapse collapse"
                     data-bs-parent="#accordionDepartures">
                    <div className="accordion-body d-flex flex-row fs-5">
                        <div className="w-50">
                            <p><b>Startstation: </b>{connection.from.station.name}</p>
                            <p><b>Verspätung: </b>{connection.from.delay + " Minuten"}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}