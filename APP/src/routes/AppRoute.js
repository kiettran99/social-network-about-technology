import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
// import Login from '../components/auth/Login';
import Alert from '../components/layout/Alert';
// import Register from '../components/auth/Register';
// import ProductList from '../components/products/ProductList';
// import AddProduct from '../components/products/product-forms/AddProduct';
// import ProductDetail from '../components/products/ProductDetail';
// import NotFoundPage from '../components/not-found-page/NotFoundPage';
import PrivateRoute from '../components/routing/PrivateRoute';
import Spinnet from '../components/layout/Spinnet';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/SideBar';

const Login = lazy(() => import('../components/auth/Login'));
const Register = lazy(() => import('../components/auth/Register'));
const ProductList = lazy(() => import('../components/products/ProductList'));
const AddProduct = lazy(() => import('../components/products/product-forms/AddProduct'));
const ProductDetail = lazy(() => import('../components/products/ProductDetail'));
const NotFoundPage = lazy(() => import('../components/not-found-page/NotFoundPage'));
const Home = lazy(() => import('../components/home/Home'));
const Groups = lazy(() => import('../components/groups/Groups'));
const GroupPage = lazy(() => import('../components/groups/GroupPage'));

const AppRoute = () => (
    <BrowserRouter>
        <>
            <div id="loading">
                <div id="loading-center">
                </div>
            </div>

            <SideBar />
            <NavBar />
            <section className=''>
                <Alert />
                <Suspense fallback={<Spinnet />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/groups" component={Groups} />
                        <Route exact path="/group-page" component={GroupPage} />
                        <Route exact path={["/product", "/products"]} component={ProductList} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/products/add" component={AddProduct} />
                        <Route exact path="/products/:id" component={ProductDetail} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Suspense>
            </section>
            <Footer />
        </>
    </BrowserRouter>
);

export default AppRoute;