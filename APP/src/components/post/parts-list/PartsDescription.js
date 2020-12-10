import React, { useRef } from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import PartsList from './PartsLList';

const PartsDescription = ({ buildParts, post: { isInPosts } }) => {

    const modalRef = useRef(null);

    const hardwares = buildParts.hardwares;

    const onShowDescriptions = (e) => {
        const current = modalRef.current;

        if (current) {
            const senderElementName = e.target.tagName.toLowerCase();

            if (senderElementName === 'th') {
                current.click();
            }
        }
    };


    // Display a half parts and then click to show modal full description.
    return (
        <>
            <div onClick={onShowDescriptions}>
                <PartsList modalRef={modalRef} buildParts={{
                    ...buildParts,
                    hardwares: hardwares.slice(0, hardwares.length / 2)
                }} />
                <button ref={modalRef} type="button"
                    className="btn btn-primary d-none" data-toggle="modal"
                    data-target="#parts-modal">Large modal
                </button>
            </div>

            { !isInPosts && <Modal buildParts={buildParts} />}
        </>
    );
};

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps)(PartsDescription);