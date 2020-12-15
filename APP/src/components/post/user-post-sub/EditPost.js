import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import BuildParts from '../build-parts/BuildParts';
import { getPost, editPost } from '../../../actions/post';
import LoadImages from '../load-images/LoadImages';

const BubbleEditor = lazy(() => import('../editor/BubbleEditor'));
const SnowEditor = lazy(() => import('../editor/SnowEditor'));

Modal.setAppElement('#root');

const EditPost = ({ auth: { user, isAuthenticated },
    post, type, editPost
}) => {

    useEffect(() => {
        if (isAuthenticated) {
            setDisabledPost(user._id !== post.userId);
        }
    }, [isAuthenticated]);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        text: '',
        images: [],
        imageUrls: [],
        buildParts: []
    });

    const [isShowBuildParts, setIsShowBuildParts] = useState(false);

    const [disabledPost, setDisabledPost] = useState(true);

    const { text, images, buildParts, imageUrls } = formData;

    const photoRef = useRef(null);

    const customStyles = {
        overlay: {
            position: 'fixed',
            zIndex: 999999,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            background: 'white',
            right: 'auto',
            inset: '0px',
            width: '50rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
            overflowY: 'auto',
            position: 'relative'
        }
    };


    const closeModal = () => {
        setIsOpen(false);

        setFormData({
            ...formData,
            images: [],
        });

        console.log(formData);
    }

    const openModal = () => {
        if (post) {
            setFormData({
                ...formData,
                text: post.text,
                buildParts: post.buildParts || [],
                imageUrls: post.imageUrls || []
            });
        }

        setIsOpen(true);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('text', text);

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append(`images`, image);
            })
        }

        if (type) {
            if (type.groupId) {
                formData.append('groupId', type.groupId);
            }
            else {
                formData.append('recipient', type.userId);
            }
        }

        formData.append('imageUrls', JSON.stringify(imageUrls));

        if (buildParts.length > 0) {
            formData.append('buildParts', JSON.stringify(buildParts));
        }

        editPost(post.postId, formData);

        setFormData({
            ...formData,
            images: [],
        });

        closeModal();
    };

    const buildPartsProps = {
        buildParts,
        setBuildParts: (data) => {
            setFormData({ ...formData, buildParts: data })
        }
    };

    const onHandleSubmitForm = (e) => {
        onSubmit(e);
    };

    return (
        <>
            {!disabledPost && (
                <a className="dropdown-item p-3" onClick={() => openModal()}>
                    <div className="d-flex align-items-top">
                        <div className="icon font-size-20"><i className="ri-delete-bin-7-line" /></div>
                        <div className="data ml-2">
                            <h6 className="">Edit</h6>
                            <p className="mb-0">Editing for this post.</p>
                        </div>
                    </div>
                </a>
            )}
            <Modal isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="post-modalLabel">Edit Post</h5>
                            <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill" /></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center">
                                <div className="user-img">
                                    {user && user.avatar && <img src={user.avatar} alt="userimg" className="avatar-60 rounded-circle img-fluid" />}
                                </div>
                                <form className="post-text ml-3 w-100" onSubmit={e => onSubmit(e)}>
                                    <div className="standalone-container">
                                        <Suspense fallback={<div>Loading...</div>}>
                                            {type && type.groupId ? <SnowEditor text={text} setText={(value) => setFormData({ ...formData, text: value })} /> :
                                                <BubbleEditor text={text} setText={(value) => setFormData({ ...formData, text: value })} />}
                                        </Suspense>
                                    </div>
                                </form>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center">
                                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    <LoadImages images={imageUrls} by='url' onChangeImages={(index) => {
                                        setFormData({
                                            ...formData,
                                            imageUrls: imageUrls.filter((image, position) => position !== index)
                                        });
                                    }} />
                                    <LoadImages images={images} onChangeImages={(index) => {
                                        setFormData({
                                            ...formData,
                                            images: images.filter((image, position) => position !== index)
                                        });
                                    }} />
                                </ul>
                            </div>
                            {isShowBuildParts && <BuildParts {...buildPartsProps} />}
                            <hr />
                            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                <li className="col-md-6 mb-3">
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3">
                                        <input ref={photoRef} className="file-upload" type="file" accept="image/*" multiple={true} onChange={e => {
                                            e.preventDefault();

                                            setFormData({
                                                ...formData,
                                                images: [...images, ...e.target.files]
                                            });
                                        }} />
                                        <div className="upload-button" style={{ fontSize: "1em" }} onClick={() => {
                                            if (photoRef.current) {
                                                photoRef.current.click();
                                            }
                                        }}>
                                            <img src="/images/small/07.png" alt="icon" className="img-fluid upload-button" />
                                            <span>Photos</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="col-md-6 mb-3"
                                    onClick={() => setIsShowBuildParts(!isShowBuildParts)}>
                                    <div className="iq-bg-primary rounded p-2 pointer mr-3"><a /><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Build Parts PC</div>
                                </li>
                            </ul>
                            <hr />
                            <div className="other-option">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="user-img mr-3">
                                            {user && user.avatar && <img src={user.avatar} alt="userimg" className="avatar-60 rounded-circle img-fluid" />}
                                        </div>
                                        <h6>Your Story</h6>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                <span className="btn btn-primary">Friend</span>
                                            </span>
                                            <div className="dropdown-menu m-0 p-0">
                                                <a className="dropdown-item p-3" href="index.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-save-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Public</h6>
                                                            <p className="mb-0">Anyone on or off Facebook</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="index.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-close-circle-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Friends</h6>
                                                            <p className="mb-0">Your Friend on facebook</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="index.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-user-unfollow-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Friends except</h6>
                                                            <p className="mb-0">Don't show to some friends</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="index.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-notification-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Only Me</h6>
                                                            <p className="mb-0">Only me</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary d-block w-100 mt-3"
                                disabled={disabledPost}
                                onClick={onHandleSubmitForm}>Post</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getPost, editPost })(EditPost);