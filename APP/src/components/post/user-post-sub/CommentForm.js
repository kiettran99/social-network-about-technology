import React, { useState } from 'react';
import { connect } from 'react-redux';

const CommentsForm = ({ actionComment, auth: { isAuthenticated }, postId }) => {

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        //addComment(productId, { text });
        actionComment({ text });
        setText('');
    };

    return (
        <div className="shadow-sm p-2 bg-light mt-2 rounded">
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    {/* <div className="col-1 form-group ml-4">
                        <img src={"https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png"}
                            className="circle rounded" width="2.1875rem" />
                    </div> */}

                    {/* {"col-xl-10 col-lg-9 col-md-9 col-sm-8 col-7"} */}
                    <div className="input-group col-sm-11 m-sm-auto mb-3">
                        <textarea className="form-control"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            disabled={!isAuthenticated}
                            placeholder={isAuthenticated ? "Write comment here ...." :
                                "To leave a comment, you need to login."} />

                        <div className="input-group-append">
                            <button className="btn btn-primary p-3"
                                disabled={!isAuthenticated}
                                type="submit">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CommentsForm);