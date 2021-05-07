import React from 'react';
import PartsList from './PartsLList';
// import Rating from './Rating';
// import Score from './Score';

const Modal = ({ closeModal, buildParts }) => {
    return (
        <div className="modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">PC Specifications</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                </div>
                <div className="modal-body">
                    {/* <Rating buildPartsId={buildParts._id} /> */}
                    {/* <Score /> */}
                    <PartsList buildParts={buildParts} />
                </div>
            </div>
        </div>
    );
};

export default Modal;