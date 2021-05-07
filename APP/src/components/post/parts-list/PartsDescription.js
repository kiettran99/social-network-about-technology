import React, { lazy, Suspense, useState } from 'react';
import Modal from './Modal';

const DialogBox = lazy(() => import('../../shared/DialogBox'));

const PartsDescription = ({ buildParts }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    // Display boxing and then click to show modal full description.
    return (
        <div className="bg-light p-1 mt-3 rounded">
            <Suspense fallback={<div></div>}>
                <div className="d-flex justify-content-between">
                    <div className="ml-3 mt-2">
                        <h4>PC Specifications</h4>
                        <p>Click button to see full descriptions PC.</p>
                    </div>
                    <div className="my-auto mr-2">
                        <button type="button" className="btn btn-primary"
                            onClick={() => openModal()}>View More</button>
                    </div>
                </div>
                <DialogBox props={{ modalIsOpen, closeModal, openModal, buildParts }} Component={Modal} />
            </Suspense>
        </div>
    );
};

export default React.memo(PartsDescription);