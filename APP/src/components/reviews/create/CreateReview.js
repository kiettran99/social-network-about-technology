import React, { useState, useRef, lazy, Suspense } from 'react';

import { connect } from 'react-redux';
import { addReview } from '../../../actions/review';

const LoadImages = lazy(() => import('../../post/load-images/LoadImages'));

const CreateReview = ({ addReview, closeModal }) => {

    const [message, setMessage] = useState(null);

    const [isWaiting, setWating] = useState(false);

    const [wallpaper, setWallpaper] = useState(null);
    const [pictures, setPictures] = useState([]);

    const titleRef = useRef();
    const priceRef = useRef();
    const generalRef = useRef();
    const favoriteRef = useRef();
    const restrictRef = useRef();
    const linkRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: titleRef.current?.value,
            price: priceRef.current?.value,
            descriptions: {
                general: generalRef.current?.value,
                favorite: favoriteRef.current?.value,
                restrict: restrictRef.current?.value
            },
            link: linkRef.current?.value
        }

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('descriptions', JSON.stringify(data.descriptions));
        formData.append('link', data.link);

        if (wallpaper) {
            formData.append('wallpaper', wallpaper);
        }

        if (pictures && pictures.length > 0) {
            pictures.forEach((picture) => {
                formData.append(`pictures`, picture);
            })
        }

        setWating(true);

        addReview(formData, (message, type) => {
            setMessage(message);
            setWating(false);

            setTimeout(() => {
                if (type) {
                    closeModal();
                }
            }, 1500);
        });
    };

    return (
        <div className="modal-dialog modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Create Review</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="ctitle">Name of Product / Service</label>
                            <input type="text" className="form-control" id="ctitle" placeholder="Technology Group"
                                ref={titleRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cprice">What price did you bought it ?</label>
                            <input type="text" className="form-control" id="cprice" placeholder="$420.00"
                                ref={priceRef} />
                        </div>


                        <div className="form-group">
                            <label htmlFor="cprice">Wallpaper</label>
                            <br />
                            <input className="" type="file" accept="image/*" onChange={e => {
                                e.preventDefault();
                                const image = e.target.files[0];

                                setWallpaper(image);
                            }} />
                            {wallpaper && <img className="profile-pic" src={URL.createObjectURL(wallpaper)} alt="profile-pic" />}
                        </div>

                        <div className="form-group">
                            <label htmlFor="cprice">Pictures</label>
                            <br />
                            <input className="" type="file" accept="image/*" multiple={true} onChange={e => {
                                // currentTarget 
                                const curentTarget = e.currentTarget;

                                if (curentTarget && curentTarget.files) {
                                    setPictures(state => [...state, ...curentTarget.files]);
                                }
                            }} />
                        </div>

                        <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0 w-50">
                            <Suspense fallback={<div>Loading...</div>}>
                                <LoadImages images={pictures} onChangeImages={(index) => {
                                    setPictures(state => state.filter((image, position) => position !== index));
                                }} />
                            </Suspense>
                        </ul>

                        <div className="form-group">
                            <label htmlFor="cgeneral">General information about the product</label>
                            <textarea type="text" className="form-control" id="cgeneral" placeholder="Reviewing product technology about smartphones and new pcs."
                                ref={generalRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cfavorite">What are your favorite spots? (*)</label>
                            <textarea type="text" className="form-control" id="cfavorite" placeholder="Reviewing product technology about smartphones and new pcs."
                                ref={favoriteRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="crestrict">What are you not satisfied with, don't like?</label>
                            <textarea type="text" className="form-control" id="crestrict" placeholder="Reviewing product technology about smartphones and new pcs."
                                ref={restrictRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="clink">Purchase link (if any)</label>
                            <input type="text" className="form-control" id="clink" placeholder="Link Purchase"
                                ref={linkRef} />
                        </div>

                        {message && (
                            <div className="form-group">
                                <span className="text-success">{message}</span>
                            </div>
                        )}
                        {isWaiting ? (
                            <button type="button" className="btn btn-primary mr-2" disabled={true}>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                             Loading...
                            </button>
                        ) : (
                                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            )}
                        <button type="reset" className="btn iq-bg-danger">Clear</button>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default connect(null, { addReview })(CreateReview);