import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';

import { connect, useSelector } from 'react-redux';
import { editReview } from '../../../actions/review';

const ImageUploader = lazy(() => import('react-images-upload'));
const SnowEditor = lazy(() => import('../../post/editor/SnowEditor'));

const EditReview = ({ editReview, closeModal }) => {

    const [message, setMessage] = useState(null);

    const [isWaiting, setWating] = useState(false);

    const [wallpaper, setWallpaper] = useState(null);
    const [pictures, setPictures] = useState([]);

    // BubbleEditor value text state
    const [general, setGeneral] = useState('');

    // Get state from redux store
    const { review, post } = useSelector((state) => {
        return {
            review: state.review.review,
            post: state.post.post
        };
    });

    const titleRef = useRef();
    const priceRef = useRef();
    const favoriteRef = useRef();
    const restrictRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
        if (review && post) {
            titleRef.current.value = post.text;
            priceRef.current.value = review.price;
            favoriteRef.current.value = review.descriptions.favorite;
            restrictRef.current.value = review.descriptions.restrict;
            linkRef.current.value = review.link || '';

            setGeneral(review.descriptions.general);
        }
    }, [review, post]);

    const onDropWallpaper = (pictureFiles) => {
        setWallpaper(pictureFiles);
    };

    const onDropPictures = (pictureFiles) => {
        setPictures(pictureFiles);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: titleRef.current?.value,
            price: priceRef.current?.value,
            descriptions: {
                general,
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


        if (wallpaper && wallpaper.length > 0) {
            wallpaper.forEach((picture) => {
                formData.append('wallpaper', picture);
            })
        }

        if (pictures && pictures.length > 0) {
            pictures.forEach((picture) => {
                formData.append(`pictures`, picture);
            })
        }

        setWating(true);

        editReview(review._id, formData, (message, type) => {
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
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill mr-0" /></button>
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
                            <Suspense fallback={<div>Loading upload wallpaper....</div>}>
                                <ImageUploader
                                    withIcon={true}
                                    singleImage={true}
                                    buttonText='Choose image'
                                    onChange={onDropWallpaper}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </Suspense>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cprice">Pictures</label>
                            <br />
                            <Suspense fallback={<div>Loading upload pictures....</div>}>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={onDropPictures}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </Suspense>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cgeneral">General information about the product</label>
                            <Suspense fallback={<div>Loading editor....</div>}>
                                <div className="snow-editor">
                                    <SnowEditor placeholder="Reviewing product technology about smartphones and new pcs."
                                        id="cgeneral" text={general} setText={setGeneral} />
                                </div>
                            </Suspense>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cfavorite">What do you like about this device?</label>
                            <textarea type="text" className="form-control" id="cfavorite" placeholder="Reviewing product technology about smartphones and new pcs."
                                rows={5} style={{ lineHeight: '22px' }}
                                ref={favoriteRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="crestrict">What don't you like about it?</label>
                            <textarea type="text" className="form-control" id="crestrict" placeholder="Reviewing product technology about smartphones and new pcs."
                                rows={5} style={{ lineHeight: '22px' }}
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

export default connect(null, { editReview })(EditReview);