export function ListRow({from, to}) {
    return (
        <>
            <div className="card m-3 mx-5">
                <div className="card-body d-flex flex-row">
                    <div className="col-3 fs-4">
                        <b>{from}</b>
                    </div>
                    <div className="col-1 fs-4">
                        <i className="bi bi-indent"></i>
                    </div>
                    <div className="col-4 fs-4">
                        <b>{to}</b>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3 fs-4 text-center">
                        <i className="bi bi-trash mx-5"></i>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
            </div>
        </>
    );
}