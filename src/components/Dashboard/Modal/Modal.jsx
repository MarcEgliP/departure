import "bootstrap-icons/font/bootstrap-icons.css";
import {deleteFavorite} from "../dashboard-service";
import React from "react";


export function Modal({textToPresent, modalTitle, setFavorites, favorites, favoriteId, setFavoriteId}) {
    function deleteFavoriteInList() {
        deleteFavorite(favoriteId);
        const filteredArray = favorites.filter((favorite) => favorite.id !== favoriteId);
        setFavorites(filteredArray);
        setFavoriteId(-1);
    }

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {textToPresent}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={deleteFavoriteInList}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}