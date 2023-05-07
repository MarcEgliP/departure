export function Connection({connection, index}) {

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#departure" + index}>
                        <p>Departure: {connection.from.departure}</p>
                    </button>
                </h2>
                <div id={"departure" + index} className="accordion-collapse collapse"
                     data-bs-parent="#accordionDepartures">
                    <div className="accordion-body">
                        <h1>Moin</h1>
                    </div>
                </div>
            </div>
        </>
    );
}