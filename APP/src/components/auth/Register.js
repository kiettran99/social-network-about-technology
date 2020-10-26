import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({ auth: { isAuthenticated }, register, setAlert }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        fullname: '',
        email: ''
    })

    const { username, password, password2, fullname, email } = formData;

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password === password2) {
            register({ username, password, fullname, email });
        }
        else {
            setAlert('Password is not match', 'dangger');
        }

    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
                            <Link className="sign-in-logo mb-5" to="/"><img src="images/logo-full.png" className="img-fluid" alt="logo" /></Link>
                            <div className="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items={1} data-items-laptop={1} data-items-tab={1} data-items-mobile={1} data-items-mobile-sm={1} data-margin={0}>
                                <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src="images/login/1.png" className="img-fluid mb-4" alt="logo" />
                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Sign Up</h1>
                            <p>Join Social Network or sign in</p>
                            <form className="mt-4" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Your Full Name</label>
                                    <input type="text" className="form-control mb-0" id="exampleInputEmail1" placeholder="Your Full Name"
                                        name="fullname"
                                        value={fullname}
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">Email address</label>
                                    <input type="email" className="form-control mb-0" id="exampleInputEmail2" placeholder="Enter Email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">Username</label>
                                    <input type="text" className="form-control mb-0" id="exampleInputEmail2" placeholder="Username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => onChange(e)} />
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">I accept <a href="sign-up.html#">Terms and Conditions</a></label>
                                    </div>
                                    <button type="submit" className="btn btn-primary float-right">Sign Up</button>
                                </div>
                                <div className="sign-info">
                                    <span className="dark-color d-inline-block line-height-2">Already Have Account ? <Link to="/login">Log In</Link></span>
                                    <ul className="iq-social-media">
                                        <li><a href="sign-up.html#"><i className="ri-facebook-box-line" /></a></li>
                                        <li><a href="sign-up.html#"><i className="ri-twitter-line" /></a></li>
                                        <li><a href="sign-up.html#"><i className="ri-instagram-line" /></a></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register, setAlert })(Register);