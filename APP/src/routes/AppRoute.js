import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
import Alert from '../components/layout/Alert';

import PrivateRoute from '../components/routing/PrivateRoute';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/SideBar';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ProductList from '../components/products/ProductList';
import AddProduct from '../components/products/product-forms/AddProduct';
import ProductDetail from '../components/products/ProductDetail';
import NotFoundPage from '../components/not-found-page/NotFoundPage';
import Home from '../components/home/Home'
import Groups from '../components/groups/Groups';
import GroupPage from '../components/groups/GroupPage';

const MainComponent = () => {
    return (
        <>
            <SideBar />
            <NavBar />
            <section className=''>
                <Alert />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/groups" component={Groups} />
                    <Route exact path="/group-page" component={GroupPage} />
                    <Route exact path={["/product", "/products"]} component={ProductList} />
                    <PrivateRoute exact path="/products/add" component={AddProduct} />
                    <Route exact path="/products/:id" component={ProductDetail} />
                    <Route component={NotFoundPage} />
                </Switch>
            </section>
            <Footer />
        </>
    )
};

const AppRoute = () => (
    <BrowserRouter>
        <>
            <div id="loading">
                <div id="loading-center">
                </div>
            </div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={MainComponent} />
            </Switch>
        </>
    </BrowserRouter>
);

export default AppRoute;