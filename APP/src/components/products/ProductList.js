import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product';
import Spinnet from '../layout/Spinnet';
import ProductItem from './ProductItem';

const ProductList = ({ products: { products, loading }, getProducts }) => {

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="p-2">
            <br />
            <p className="text-center">
                We are delivering to your region with limited shipping options.
                Please expect extended delivery time. <a>Learn more.</a>
            </p>
            <hr />

            <div className="row">
                {loading ? <Spinnet /> :
                    products.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))}
            </div>

            {/* <div>
                <button className="btn btn-primary w-50 m-auto">Next More</button>
            </div> */}
        </div>
    );
};

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    products: state.product
});

export default connect(mapStateToProps, { getProducts })(ProductList);

