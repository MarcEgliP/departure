import "bootstrap-icons/font/bootstrap-icons.css";
import {BsArrowRight} from "react-icons/bs";
import moment from "moment/moment";
import 'moment/locale/de';
import {useTranslation} from "react-i18next";

export function SearchResult({connection, index}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target={"#searchResult" + index}>
                        <div className="d-flex flex-row fs-4 w-100 align-items-center">
                            <p className="w-50 m-0">
                                {t("starting_station", {keyPrefix: "station"})}{connection.from.station.name}
                            </p>
                            <BsArrowRight className="display-6"></BsArrowRight>
                            <p className="d-flex justify-content-end w-50 me-5 m-0">
                                {t("ending_station", {keyPrefix: "station"})}{connection.to.station.name}
                            </p>
                        </div>
                    </button>
                </h2>
                <div id={"searchResult" + index} className="accordion-collapse collapse"
                     data-bs-parent="#searchAccordion">
                    <div className="accordion-body d-flex flex-row w-100">
                        <div className="d-flex flex-column w-50 fs-4">
                            <div className="d-flex flex-row">
                                <b className="me-3">{t("departure", {keyPrefix: "station"})}</b>
                                {moment(connection.from.departure).format("hh:mm:ss")}
                            </div>
                            <div className="d-flex flex-row">
                                <b className="me-3">{t("arrival", {keyPrefix: "station"})}</b>
                                {moment(connection.to.arrival).format("HH:mm")}
                            </div>
                        </div>
                        <div className="d-flex flex-column w-50 fs-4">
                            <div className="d-flex flex-row">
                                <b className="me-3">{t("platform", {keyPrefix: "connections"})} </b>
                                {connection.from.platform ? connection.from.platform : "undefiniert"}
                            </div>
                            <div className="d-flex flex-row">
                                <b className="me-3">{t("departure_in", {keyPrefix: "connections"})}</b>
                                {moment(connection.from.departure).local('de').fromNow()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}