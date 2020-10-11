import React, { useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct, getMoreComments } from '../../actions/product';
import NotFoundPage from '../not-found-page/NotFoundPage';
import Spinnet from '../layout/Spinnet';
import ProductDescription from './ProductDescription';

// Code-Split Lazing loading Components
const ProductComments = lazy(() => import('./ProductComments'));


const ProductDetail = ({ getProduct, getMoreComments, match, product: { product, loading } }) => {
    useEffect(() => {
        getProduct(match.params.id);
    }, [getProduct, match.params.id]);

    return loading ? <Spinnet /> : (!product ? <NotFoundPage /> :
        <div className="container-flud card m-md-3 rounded shadow-sm">
            <ProductDescription product={product} />

            <Suspense fallback={<h6 className="text-center text-muted">Loading comments.</h6>}>
                <ProductComments productId={product._id} likes={product.likes} comments={product.comments} />
                {product.comments.length > 0 && <button className="btn text-primary"
                    onClick={() => getMoreComments(product._id, product.comments.length)}>More comments</button>}
            </Suspense>

        </div >
    );
};

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    getMoreComments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    product: state.product
});

export default connect(mapStateToProps, { getProduct, getMoreComments })(ProductDetail);