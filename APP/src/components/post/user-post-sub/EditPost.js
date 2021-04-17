import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import BuildParts from '../build-parts/BuildParts';
import { getPost, editPost } from '../../../actions/post';
import LoadImages from '../load-images/LoadImages';
import { EditorState } from 'draft-js';
import { createEditorStateWithText } from '@draft-js-plugins/editor';
import HashTagEditor from '../editor/hash-tag-editor/HashTagEditor';
import editor from './editor/editor';

import InviteUser from '../../shared/InviteUser';
import Toolbar from '../toolbar/ToolBar';

const BubbleEditor = lazy(() => import('../editor/BubbleEditor'));

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
    const [isOpenHashTag, setOpenHashTag] = useState(false);

    const [disabledPost, setDisabledPost] = useState(true);

    const [hashTagEditor, setHashTagEditor] = useState(EditorState.createEmpty());

    const [tags, setTags] = useState([]);

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
            justifyContent: 'center',
        },
        content: {
            border: 'none',
            background: 'white',
            right: 'auto',
            inset: '0px',
            width: '50rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.25)',
            overflowY: 'auto',
            position: 'relative',
            padding: '0px'
        }
    };


    const closeModal = () => {
        setIsOpen(false);

        setFormData({
            ...formData,
            images: [],
        });
    }

    const openModal = () => {
        if (post) {
            setFormData({
                ...formData,
                text: post.text,
                buildParts: post.buildParts || [],
                imageUrls: post.imageUrls || []
            });

            if (post.tags) {
                setTags(post.tags);
            }

            if (post.hashtag && post.hashtag.tags.length > 0) {
                setOpenHashTag(true);
                setHashTagEditor(createEditorStateWithText(post.hashtag.rawText));
            }

            privacyRef.current = post.privacy;
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

        // Add Hashtag
        formData.append('hashtag', JSON.stringify({
            tags: editor.convertHashTagToArray(hashTagEditor),
            rawText: hashTagEditor.getCurrentContent().getPlainText()
        }))

        // Add Tags Friends
        if (tags.length > 0) {
            formData.append('tags', JSON.stringify(tags));
        }

        // Add Privacy
        formData.append('privacy', privacyRef.current);

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
        },
        setIsShowBuildParts
    };

    const onHandleSubmitForm = (e) => {
        onSubmit(e);
    };

    // Tag Friends
    const [tagFriendsIsOpen, setOpenTagFriends] = useState(false);

    // Privacy post (public, friends, private)
    const privacyRef = useRef(1);

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
                {tagFriendsIsOpen ?
                    <InviteUser closeModal={() => {
                        setOpenTagFriends(false);
                    }} configs={{
                        title: 'Add Friends to Tags',
                        tags,
                        action: (selectedUsers) => {
                            setTags(selectedUsers.map(selectedUser => ({
                                user: selectedUser._id,
                                fullname: selectedUser.fullname,
                                avatar: selectedUser.avatar
                            })));
                            setOpenTagFriends(false);
                        }
                    }} /> :
                    (
                        <div className="modal-lg m-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="post-modalLabel">Edit Post</h5>
                                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill m-0" /></button>
                                </div>
                                <div className="modal-body">
                                    <div className="d-flex align-items-center">
                                        <div className="user-img">
                                            {user && user.avatar && <img src={user.avatar} alt="userimg" className="avatar-60 rounded-circle img-fluid" />}
                                        </div>
                                        <form className="post-text ml-3 w-100" onSubmit={e => onSubmit(e)}>
                                            <div className="standalone-container">
                                                <Suspense fallback={<div>Loading...</div>}>
                                                    <BubbleEditor text={text} setText={(value) => setFormData({ ...formData, text: value })} />
                                                </Suspense>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center">
                                        <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                            <LoadImages images={imageUrls} by='url' onChangeImages={(index) => {
                                                setFormData((state) => ({
                                                    ...state,
                                                    imageUrls: state.imageUrls.filter((image, position) => position !== index)
                                                }));
                                            }} />
                                            <LoadImages images={images} onChangeImages={(index) => {
                                                setFormData((state) => ({
                                                    ...state,
                                                    images: state.images.filter((image, position) => position !== index)
                                                }));
                                            }} />
                                        </ul>
                                    </div>
                                    {isShowBuildParts && <BuildParts {...buildPartsProps} />}
                                    {isOpenHashTag && <HashTagEditor placeholder=""
                                        editorState={hashTagEditor} setEditorState={setHashTagEditor}
                                        disable={disabledPost} />}
                                    <hr />
                                    <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                                        <li className="col-md-6 mb-3">
                                            <div className="iq-bg-primary rounded p-2 pointer mr-3">
                                                <input ref={photoRef} className="file-upload" type="file" accept="image/*" multiple={true} onChange={e => {
                                                    // currentTarget 
                                                    const curentTarget = e.currentTarget;

                                                    if (curentTarget && curentTarget.files) {
                                                        setFormData((state) => ({
                                                            ...state,
                                                            images: [...state.images, ...curentTarget.files]
                                                        }));
                                                    }
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
                                            onClick={() => setOpenTagFriends(true)}>
                                            <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="index.html#" /><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Tag Friends {tags.length > 0 && `(${tags.length})`}</div>
                                        </li>
                                        <li className="col-md-6 mb-3"
                                            onClick={() => setIsShowBuildParts(!isShowBuildParts)}>
                                            <div className="iq-bg-primary rounded p-2 pointer mr-3"><a /><img src="/images/small/14.png" alt="icon" className="img-fluid" /> Build Parts PC</div>
                                        </li>
                                        <li className="col-md-6 mb-3"
                                            onClick={() => setOpenHashTag(!isOpenHashTag)}>
                                            <div className="iq-bg-primary rounded p-2 pointer mr-3"><a href="index.html#" /><img src="/images/small/09.png" alt="icon" className="img-fluid" /> HashTag</div>
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
                                            <Toolbar privacy={privacyRef} type={type} edit={true} />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary d-block w-100 mt-3"
                                        disabled={disabledPost}
                                        onClick={onHandleSubmitForm}>Post</button>
                                </div>
                            </div>
                        </div>
                    )}
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getPost, editPost })(EditPost);