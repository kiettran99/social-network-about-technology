import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resettPassword } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ResetPassword = ({ auth: { isAuthenticated, user, isConfirmResetPassword }, resettPassword, history,
    match
}) => {

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const { password, confirmPassword } = formData;

    if (isAuthenticated && user) {
        history.goBack();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        resettPassword(match.params.token, { password, confirmPassword });
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const confirmResetPassword = () => {
        return (
            <div className="col-md-6 bg-white pt-5">
                <div className="sign-in-from">
                    <img src="/images/login/mail.png" width={80} alt="" />
                    <h1 className="mt-3 mb-0">Success !</h1>
                    <p>Password update successfully! You can now login to social network with the new password.</p>
                    <div className="d-inline-block w-100">
                        <Link to="/login" className="btn btn-primary mt-3">Back to Login</Link>
                    </div>
                </div>
            </div>
        )
    };

    const requestEmail = () => {
        return (
            <div className="col-md-6 bg-white pt-5">
                <div className="sign-in-from">
                    <h1 className="mb-3">Reset Your Password</h1>
                    <p>Enter a new password below.</p>
                    <form className="mt-4" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">New password</label>
                            <input type="password" className="form-control mb-0" id="exampleInputEmail1" placeholder="Password"
                                tabIndex="1"
                                autoFocus={true}
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Confirm new password</label>
                            <input type="password" className="form-control mb-0" id="exampleInputEmail1" placeholder="Confirm Password"
                                tabIndex="1"
                                autoFocus={true}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => onChange(e)} />
                        </div>
                        <div className="d-inline-block w-100">
                            <button type="submit" className="btn btn-primary float-right">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    };

    return (
        <section className="sign-in-page">
            <div id="container-inside">
                <div id="circle-small" />
                <div id="circle-medium" />
                <div id="circle-large" />
                <div id="circle-xlarge" />
                <div id="circle-xxlarge" />
            </div>
            <div className="container p-0">
                <div className="row no-gutters">
                    <div className="col-md-6 text-center pt-5">
                        <div className="sign-in-detail text-white">
                            <Link className="sign-in-logo mb-5" to="/"><img src="/images/logo-full.png" className="img-fluid" alt="logo" /></Link>
                            <div className="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items={1} data-items-laptop={1} data-items-tab={1} data-items-mobile={1} data-items-mobile-sm={1} data-margin={0}>
                                <div className="item">
                                    <img src="/images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Find new friends</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="/images/login/2.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Connect with the world</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="/images/login/3.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Create new events</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isConfirmResetPassword ? confirmResetPassword() : requestEmail()}
                </div>
            </div>
        </section>
    );
};

ResetPassword.propTypes = {
    resettPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resettPassword })(withRouter(ResetPassword));