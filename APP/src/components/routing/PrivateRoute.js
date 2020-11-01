import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import Process from '../layout/Process';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {

    useEffect(() => {
        loadUser();
    }, []);

    return <Route {...rest} render={props => (loading ? <Process /> : (!isAuthenticated && !loading ? <Redirect to="/" />
        : <Component {...props} />))} />
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);