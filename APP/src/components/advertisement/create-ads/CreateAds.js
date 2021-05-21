import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import 'rc-steps/assets/index.css';
import Steps, { Step } from 'rc-steps';

import DialogBox from '../../shared/DialogBox';
import Posts from './posts/Posts';
import PreviewPost from './preview-post/PreviewPost';

import { checkNameExisted, createAds } from '../services/adsServices';
import Audience from './audience/Audience';
import Payment from './payment/Payment';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { setRequest, setComplete } from '../../../actions/loading-bar';
import Finish from './finish/Finish';

const CreateAds = ({ location }) => {

    // State
    const [step, setStep] = useState(0);
    const [post, setPost] = useState(null);

    const [nameCompaign, setNameCompaign] = useState('');
    const [message, setMessage] = useState('');
    const [isPassed, setPassed] = useState(false);

    // State and Config Modal
    const [modalIsOpen, setIsOpen] = useState(false);

    // Audience
    const [fromAge, setFromAge] = useState(17);
    const [toAge, setToAge] = useState(32);

    const [gender, setGender] = useState('all');
    const [messageAge, setMessageAge] = useState(null);

    // Saved settings into local storage
    const [currentAds, setCurrentAds] = useLocalStorage('current-ads', {
        step,
        post,
        nameCompaign,
        isPassed,
        fromAge,
        toAge,
        messageAge,
        message,
        gender,
        inprogress: false,
        ads: null
    });

    // Dispatch redux
    const dispatch = useDispatch();

    useEffect(() => {
        // Retore point user is creating ads.
        if (currentAds && currentAds.inprogress) {
            setStep(currentAds.step);
            setPost(currentAds.post);
            setNameCompaign(currentAds.nameCompaign);
            setPassed(currentAds.isPassed);
            setFromAge(currentAds.fromAge);
            setToAge(currentAds.toAge);
            setMessageAge(currentAds.messageAge);
            setGender(currentAds.gender);
        }

        return () => {
            if (currentAds && currentAds.inprogress) {
                localStorage.removeItem('current-ads');
            }
        };
    }, []);

    useEffect(() => {
        const query = queryString.parse(location.search);

        if (query.status) {
            setStep(4);
            changeCurrentAds({ step: 4 });
        }
    }, [location]);

    const changeCurrentAds = (change) => {
        setCurrentAds(state => ({
            ...state,
            ...change
        }));
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const onNextStep = () => {
        if (step >= 0 && step < 5) {
            setStep(step + 1);
            changeCurrentAds({ step: step + 1 });
        }
    }

    const onPreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
            changeCurrentAds({ step: step - 1 });
        }
    }

    // Handler
    const onFocusOutAdCompaign = () => {
        setPassed(false);

        checkNameExisted(nameCompaign).then(data => {
            if (data.exists) {
                setPassed(false);
                changeCurrentAds({ isPassed: false });
                return setMessage('The Ad Compaign is existed. Please try other name.');
            }

            if (nameCompaign === '') {
                changeCurrentAds({ isPassed: false });
                return setPassed(false);
            }

            setMessage('');
            setPassed(true);

            changeCurrentAds({
                inprogress: true,
                message: '',
                isPassed: true,
                nameCompaign
            });
        }).catch(() => {
            setMessage('');
            changeCurrentAds({ message: '' });
        })
    };

    const onCreateAds = async () => {
        const adsData = {
            name: nameCompaign,
            post: post._id,
            audience: {
                gender,
                age: {
                    from: fromAge,
                    to: toAge
                }
            }
        };

        dispatch(setRequest());

        const ads = await createAds(adsData);

        dispatch(setComplete());
        // Done
        setStep(3);
        changeCurrentAds({ ads: ads._id, step: 3 });
    };

    const displayByStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className="ad-compaign-2 mx-2 mt-3">
                        <label>Create name campaign</label>
                        <div className="form-group">
                            <input className="form-control"
                                autoFocus={true}
                                value={nameCompaign}
                                onChange={(e) => setNameCompaign(e.target.value)}
                                onBlur={onFocusOutAdCompaign}
                                placeholder="E.x. The Ad Compaign" />
                        </div>
                        {message && <p className="text-danger">{message}</p>}
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
                                <PreviewPost post={post} />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                const props = {
                    setPassed,
                    fromAge, setFromAge,
                    toAge, setToAge,
                    gender, setGender,
                    message: messageAge, setMessage: setMessageAge,
                    changeCurrentAds
                }
                return <Audience {...props} />
            case 3:
                return <Payment currentAds={currentAds} />
            case 4:
            default:
                return <Finish location={location} />
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
                        <div className="container-fluid-sm">
                            <div className="mb-4 text-center">
                                <p>When you create a campaign, select a goal that corresponds to the main thing you want your campaign to achieve for your business.</p>
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
                                {step == 2 && (
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => onCreateAds()}>Create</button>
                                )}
                                {step !== 2 && step < 4 && (
                                    <button className="btn btn-primary"
                                        type="button"
                                        disabled={!isPassed}
                                        onClick={() => onNextStep()}>Next</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox props={{ modalIsOpen, closeModal, openModal, post, setPost, changeCurrentAds }} Component={Posts} />
        </div >
    );
};

export default CreateAds;