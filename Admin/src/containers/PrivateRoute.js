import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = (props) => {

    useEffect(() => {
        loadUser();
    }, []);

    const urlAPI = 'https://tlcn-social-network-api.herokuapp.com';

    const loadUser = async () => {
        try {
            await axios.get(`${urlAPI}/api/auth`);

            setAuth({
                ...auth,
                isAuthenticated: true,
                loading: false
            });
        }
        catch (e) {
            console.log(e);
            setAuth({
                isAuthenticated: false,
                loading: false
            });
        }

    };

    const [auth, setAuth] = useState({
        isAuthenticated: null,
        loading: true
    });

    const { isAuthenticated, loading } = auth;

    const Loading = (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
    );

    if (loading) {
        return <Loading />
    } else if (!isAuthenticated) {
        return <Redirect to="/loading" />
    }

    return <Route {...props} />
};

export default PrivateRoute;