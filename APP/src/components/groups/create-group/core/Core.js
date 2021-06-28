import React, { useEffect, useState, useRef, memo } from 'react';
import { connect } from 'react-redux';

import { addGroup } from '../../../../actions/group';

const ImageUploader = React.lazy(() => import('react-images-upload'));

const Core = ({ closeModal, addGroup, edit, group, editGroup }) => {

    const [isPublic, setIsPublic] = useState(true);

    const [message, setMessage] = useState(null);

    const [isWaiting, setWating] = useState(false);

    const [wallpaper, setWallpaper] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const nameRef = useRef();
    const infoRef = useRef();

    useEffect(() => {
        if (edit && group) {
            nameRef.current.value = group.name;
            infoRef.current.value = group.info;
            setIsPublic(group.isPublic);
        }
    }, [edit, group]);

    const styleButtonPrivacy = (isPublic) => {
        return isPublic ? 'btn-primary' : 'btn-outline-primary';
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const info = infoRef.current?.value;

        setWating(true);

        // Auto change joined tab when create group.
        const $tabJoined = document.querySelector('#profile-tab-two');

        if ($tabJoined) {
            $tabJoined.click();
        }

        // Create Formdata
        const formData = new FormData();

        formData.append('name', name);
        formData.append('info', info);

        formData.append('isPublic', isPublic);

        if (avatar) {
            avatar.forEach((picture) => {
                formData.append('avatar', picture);
            });
        }

        if (wallpaper) {
            wallpaper.forEach((picture) => {
                formData.append('wallpaper', picture);
            });
        }

        if (edit) {
            return editGroup(group._id, formData, (message, type) => {
                setMessage(message);
                setWating(false);

                setTimeout(() => {
                    if (type) {
                        closeModal();
                    }
                }, 1500);
            });
        }

        addGroup(formData, (message, type) => {
            setMessage(message);
            setWating(false);

            setTimeout(() => {
                if (type) {
                    closeModal();
                    document.getElementById('groupList').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 1500);
        });
    };

    const onDropWallpaper = (pictureFiles) => {
        setWallpaper(pictureFiles);
    };

    const onDropAvtar = (pictureFiles) => {
        setAvatar(pictureFiles);
    };

    return (
        <div className="modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{edit ? 'Edit' : 'Create'} Group</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill mr-0" /></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="cname">Name Group:</label>
                            <div data-toggle="tooltip" title="Name shouldn't have special character and exceed 255 characters." className="btn btn-link float-right">Tips</div>
                            <input type="text" className="form-control" id="cname" placeholder="Technology Group"
                                ref={nameRef} />
                        </div>
                        <div className="form-group">
                            <div className="d-flex justify-content-start">
                                <div className="mr-2">
                                    <p className="mb-0">Privacy:</p>
                                    <div className="btn-group">
                                        <button type="button" className={`btn ${styleButtonPrivacy(isPublic)}`}
                                            onClick={() => setIsPublic(true)}>
                                            <i className="ri-earth-fill"></i>Public</button>
                                        <button type="button" className={`btn ${styleButtonPrivacy(!isPublic)}`}
                                            onClick={() => setIsPublic(false)}>
                                            <i className="ri-lock-fill"></i>Private</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="info">Info:</label>
                            <textarea type="text" className="form-control" id="info" placeholder="Reviewing product technology about smartphones and new pcs."
                                ref={infoRef} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="wallpaper">Avatar</label>
                            <br />
                            <React.Suspense fallback={<div>Loading upload avatar....</div>}>
                                <ImageUploader
                                    withIcon={true}
                                    singleImage={true}
                                    buttonText='Choose image'
                                    onChange={onDropAvtar}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </React.Suspense>
                        </div>

                        <div className="form-group">
                            <label htmlFor="wallpaper">Wallpaper</label>
                            <br />
                            <React.Suspense fallback={<div>Loading upload wallpaper....</div>}>
                                <ImageUploader
                                    withIcon={true}
                                    singleImage={true}
                                    buttonText='Choose image'
                                    onChange={onDropWallpaper}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </React.Suspense>
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

export default connect(null, { addGroup })(memo(Core));