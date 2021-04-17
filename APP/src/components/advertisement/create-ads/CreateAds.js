import React, { useState } from 'react';
import 'rc-steps/assets/index.css';
import Steps, { Step } from 'rc-steps';
import DialogBox from '../../shared/DialogBox';
import Posts from './posts/Posts';

const CreateAds = (props) => {

    const [step, setStep] = useState(0);
    const [post, setPost] = useState(null);

    const [modalIsOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const onNextStep = () => {
        if (step >= 0 && step < 5) {
            setStep(step + 1);
        }
    }

    const onPreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    }

    const displayByStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className="ad-compaign-2 mx-2 mt-3">
                        <label>Create name campaign</label>
                        <div className="form-group">
                            <input className="form-control"
                                placeholder="E.x. The Ad Compaign" />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="ad-compaign-2 p-4">
                        <div className="row">
                            <div className="col-lg-5 col-12">
                                <div className="form-group">
                                    <h4>Content</h4>
                                    <p>Preview a post about headline, images, ...</p>
                                </div>
                                <button type="button" className="btn btn-light mr-20"
                                    onClick={() => openModal()}>Choose a post</button>
                                <button type="button" className="btn btn-light"
                                    onClick={() => openModal()}><i className="ri-add-fill"></i></button>
                            </div>

                            <div className="col-lg-7 col-12">
                                {/* <UserPost /> */}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="ad-compaign-3">
                        <label>Audience</label>
                        <input className="form-control" />
                        <br />
                    </div>
                );
        }
    }

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Ad Campaign</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="container">
                            <div className="iq-card-header text-center">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>

                            <div className="form-group">
                                <Steps current={step} labelPlacement="vertical">
                                    <Step title="Create ad compaign" />
                                    <Step title="Create Post" />
                                    <Step title="Audience" />
                                    <Step title="Payment" />
                                    <Step title="Finish" />
                                </Steps>
                            </div>


                            {displayByStep(step)}

                            <div className="text-center">
                                {step > 0 && (
                                    <button className="btn btn-white mr-2"
                                        type="button"
                                        onClick={() => onPreviousStep()}>Previous</button>
                                )}
                                {step < 4 && (
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={() => onNextStep()}>Next</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox props={{ modalIsOpen, closeModal, openModal, post, setPost }} Component={Posts} />
        </div >
    );
};

export default CreateAds;