import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, register } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ auth: { isAuthenticated, user }, login, register, history }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        gender: false,
        country: '',
        email: '',
        fullname: ''
    })

    const [isSignUp, setIsSignUp] = useState(false);
    const [checkedTerms, setCheckedTerms] = useState(false);

    const { username, password, repeatPassword, gender, country, email, fullname } = formData;

    if (isAuthenticated && user) {
        history.goBack();
    }

    /*
        Another solution: When Login is successfully, check isAuthenticated true
        Redirect to home through Redirect (react-router-dom).

        if (isAuthenticated) {
            return <Redirect to="/" />
        }

        Current solution: When Login is successfully, check user is loadded then
        Go back previous page.
    */

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp) {
            if (password === repeatPassword) {
                register({ username, password, country, email, fullname });
            }
        }
        else {
            login(username, password);
        }
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="sign-in-page" style={{ backgroundColor: "#e75348" }}>
            <div className="signin-popup">
                <div className="signin-pop">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="cmp-info">
                                <div className="cm-logo">
                                    <img src="images/cm-logo.png" alt="" />
                                    <p>Workwise,  is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely</p>
                                </div>{/*cm-logo end*/}
                                <img src="images/cm-main-img.png" alt="" />
                            </div>{/*cmp-info end*/}
                        </div>
                        <div className="col-lg-6">
                            <div className="login-sec">
                                <ul className="sign-control">
                                    <li data-tab="tab-1" className={isSignUp ? 'animated fadeIn' : 'animated fadeIn current'} onClick={() => setIsSignUp(!isSignUp)}><a href="#">Sign in</a></li>
                                    <li data-tab="tab-2" className={isSignUp ? 'animated fadeIn current' : 'animated fadeIn'} onClick={() => setIsSignUp(!isSignUp)}><a href="#">Sign up</a></li>
                                </ul>
                                <div className={isSignUp ? "sign_in_sec" : "sign_in_sec current"} id="tab-1">
                                    <h3>Sign in</h3>
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="row">
                                            <div className="col-lg-12 no-pdd">
                                                <div className="sn-field">
                                                    <input type="text" name="username" placeholder="Username"
                                                        onChange={(e) => onChange(e)} />
                                                    <i className="la la-user" />
                                                </div>{/*sn-field end*/}
                                            </div>
                                            <div className="col-lg-12 no-pdd">
                                                <div className="sn-field">
                                                    <input type="password" name="password" placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => onChange(e)} />
                                                    <i className="la la-lock" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 no-pdd">
                                                <div className="checky-sec">
                                                    <div className="fgt-sec">
                                                        <input type="checkbox" name="cc" id="c1" />
                                                        <label htmlFor="c1">
                                                            <span />
                                                        </label>
                                                        <small>Remember me</small>
                                                    </div>{/*fgt-sec end*/}
                                                    <a href="sign-in.html#">Forgot Password?</a>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 no-pdd">
                                                <button type="submit" value="submit">Sign in</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="login-resources">
                                        <h4>Login Via Social Account</h4>
                                        <ul>
                                            <li><a href="sign-in.html#" className="fb"><i className="fab fa-facebook" />Login Via Facebook</a></li>
                                            <li><a href="sign-in.html#" className="tw"><i className="fab fa-twitter" />Login Via Twitter</a></li>
                                        </ul>
                                    </div>{/*login-resources end*/}
                                </div>{/*sign_in_sec end*/}
                                <div className={isSignUp ? "sign_in_sec current" : "sign_in_sec"} id="tab-2">
                                    {/* <div className="signup-tab">
                                        <i className="fas fa-long-arrow-left" />
                                        <h2>johndoe@example.com</h2>
                                    </div> */}
                                    <div className="dff-tab current" id="tab-3">
                                        <form onSubmit={e => onSubmit(e)}>
                                            <h3>Sign up</h3>
                                            <div className="row">
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="text" name="username" placeholder="Username"
                                                            value={username}
                                                            onChange={(e) => onChange(e)} />
                                                        <i className="la la-user" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="text" name="email" placeholder="Email"
                                                            value={email}
                                                            onChange={e => onChange(e)} />
                                                        <i className="la la-inbox" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="text" name="fullname" placeholder="Full Name"
                                                            value={fullname}
                                                            onChange={e => onChange(e)} />
                                                        <i className="la la-user" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="text" name="country" placeholder="Country (optional)"
                                                            value={country}
                                                            onChange={e => onChange(e)} />
                                                        <i className="la la-globe" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <select>
                                                            <option>Category</option>
                                                            <option>Category 1</option>
                                                            <option>Category 2</option>
                                                            <option>Category 3</option>
                                                            <option>Category 4</option>
                                                        </select>
                                                        <i className="la la-genderless" />
                                                        <span><i className="fas fa-ellipsis-h" /></span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="password" name="password" placeholder="Password"
                                                            value={password}
                                                            onChange={e => onChange(e)} />
                                                        <i className="la la-lock" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="password" name="repeatPassword" placeholder="Repeat Password"
                                                            value={repeatPassword}
                                                            onChange={e => onChange(e)} />
                                                        <i className="la la-lock" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <div className="checky-sec st2">
                                                        <div className="fgt-sec">
                                                            <input type="checkbox"
                                                                value={checkedTerms}
                                                                onChange={() => setCheckedTerms(!checkedTerms)}
                                                                name="cc" id="c2" />
                                                            <label htmlFor="c2">
                                                                <span />
                                                            </label>
                                                            <small>Yes, I understand and agree to the workwise Terms &amp; Conditions.</small>
                                                        </div>{/*fgt-sec end*/}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 no-pdd">
                                                    <button type="submit" disabled={!checkedTerms} value="submit">Get Started</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>{/*dff-tab end*/}
                                </div>
                            </div>{/*login-sec end*/}
                        </div>
                    </div>
                </div>{/*signin-pop end*/}
            </div>{/*signin-popup end*/}
            <div className="footy-sec">
                <div className="container">
                    <ul>
                        <li><a href="help-center.html">Help Center</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="sign-in.html#">Privacy Policy</a></li>
                        <li><a href="sign-in.html#">Community Guidelines</a></li>
                        <li><a href="sign-in.html#">Cookies Policy</a></li>
                        <li><a href="sign-in.html#">Career</a></li>
                        <li><a href="forum.html">Forum</a></li>
                        <li><a href="sign-in.html#">Language</a></li>
                        <li><a href="sign-in.html#">Copyright Policy</a></li>
                    </ul>
                    <p><img src="images/copy-icon.png" alt="" />Copyright 2019</p>
                </div>
            </div>{/*footy-sec end*/}
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login, register })(withRouter(Login));