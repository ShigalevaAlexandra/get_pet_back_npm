import React from "react";

const ModalRefactorCard = ({ show, primaryText, primaryClass = 'primary', secondaryText, closeModal, confirm, title, body }) => {
    const style = show ? { display: "block" } : {};
    const className = `modal fade ${show ? "show" : ""}`;
    return (
        <>
            {show && <div className="modal-backdrop fade show"></div>}
            <div className={className} tabIndex="-1" role="dialog" style={style}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            {secondaryText && <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={closeModal}>{secondaryText}</button>}
                            <button type="button" className={`btn btn-${primaryClass}`} onClick={confirm}>{primaryText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalRefactorCard;
