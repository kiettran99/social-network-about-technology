import React from 'react';
import PartsList from './PartsLList';

const Modal = ({ buildParts }) => {
    return (
        <div className="modal fade" id="parts-modal" tabIndex={-1} role="dialog" aria-labelledby="post-modalLabel" aria-hidden="true" style={{ display: 'none' }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="post-modalLabel">Hardwares</h5>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                    </div>
                    <div className="modal-body">
                        <PartsList buildParts={buildParts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;