import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import BuildParts from './build-parts/BuildParts';
import { EditorState } from 'draft-js';
import HashTagEditor from './editor/hash-tag-editor/HashTagEditor';
import editor from './user-post-sub/editor/editor';

import InviteUser from '../shared/InviteUser';

const LoadImages = lazy(() => import('./load-images/LoadImages'));
const BubbleEditor = lazy(() => import('./editor/BubbleEditor'));


const CreatePost = ({ auth: { user, isAuthenticated }, addPost, type }) => {

  useEffect(() => {
    if (isAuthenticated) {
      setDisabledPost(false);
    }
  }, [isAuthenticated]);

  const [formData, setFormData] = useState({
    text: '',
    images: [],
    buildParts: []
  });

  const [isShowBuildParts, setIsShowBuildParts] = useState(false);
  const [isOpenHashTag, setOpenHashTag] = useState(false);

  const [disabledPost, setDisabledPost] = useState(true);

  const [hashTagEditor, setHashTagEditor] = useState(EditorState.createEmpty());

  const [tags, setTags] = useState([]);

  const { text, images, buildParts } = formData;

  const photoRef = useRef(null);
  const closeModalRef = useRef(null);

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

    addPost(formData);

    setFormData({
      text: '',
      images: [],
      buildParts: []
    });

    // Close modal and go down new post.
    closeModalRef.current.click();

    window.scrollTo({ top: 75, behavior: 'smooth' });
  };

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }

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

  // Modals with tag friends
  const [tagFriendsIsOpen, setOpenTagFriends] = useState(false);

  return (
    <div id="post-modal-data" className="iq-card iq-card-block iq-card-stretch iq-card-height"  >
      <div className="iq-card-header d-flex justify-content-between">
        <div className="iq-header-title">
          <h4 className="card-title">Create Post</h4>
        </div>
      </div>
      <div className="iq-card-body" data-toggle="modal" data-target="#post-modal">
        <div className="d-flex align-items-center">
          <div className="user-img">
            {user && user.avatar && <img src={user.avatar} alt="userimg" className="avatar-60 rounded-circle" />}
          </div>
          <form className="post-text ml-3 w-100" onSubmit={e => onSubmit(e)}>
            <div className="standalone-container">
              <Suspense fallback={<div>Loading...</div>}>
                <BubbleEditor readOnly={true} text={text} setText={(value) => setFormData({ ...formData, text: value })} />
              </Suspense>
            </div>
          </form>
        </div>
        <hr />
        <ul className="post-opt-block d-flex align-items-center list-inline m-0 p-0">
          <li className="iq-bg-primary rounded p-2 pointer mr-3"><a href="index.html#" /><img src="/images/small/07.png" alt="icon" className="img-fluid" /> Photos</li>
          <li className=" iq-bg-primary rounded p-2 pointer mr-3"><a href="index.html#" /><img src="/images/small/08.png" alt="icon" className="img-fluid" /> Tag Friends</li>
          <li className=" iq-bg-primary rounded p-2 pointer mr-3"><a href="index.html#" /><img src="/images/small/09.png" alt="icon" className="img-fluid" /> Hashtag</li>
          <li className="iq-bg-primary rounded p-2 pointer">
            <div className="iq-card-header-toolbar d-flex align-items-center">
              <div className="dropdown">
                <span className="dropdown-toggle" id="post-option" data-toggle="dropdown">
                  <i className="ri-more-fill" />
                </span>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="post-option" style={{}}>
                  <a className="dropdown-item" href="index.html#">Build Parts PC</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="modal fade" id="post-modal" tabIndex={-1} role="dialog" aria-labelledby="post-modalLabel" aria-hidden="true" style={{ display: 'none' }}>
        {tagFriendsIsOpen ? (
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
          }} />
        ) : (
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="post-modalLabel">Create Post</h5>
                <button ref={closeModalRef} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill m-0" /></button>
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
                    <Suspense fallback={<div>Loading...</div>}>
                      <LoadImages images={images} onChangeImages={(index) => {
                        setFormData((state) => ({
                          ...state,
                          images: state.images.filter((image, position) => position !== index)
                        }));
                      }} />
                    </Suspense>
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
        )}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(CreatePost);