import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductItem = ({ product: { _id, name, imageUrl, price, description, manufacturer, category,
    conditionProduct, quantity } }) => (
        <div className="col-lg-3 col-md-4 rounded">
            <figure className="card card-product shadow">
                <div className="img-wrap">
                    <img src={imageUrl} width={348} height={220} />
                </div>
                <figcaption className="info-wrap">
                    <h4 className="text-primary">{name}</h4>
                    <p className="text-secondary">{description}</p>
                    <div className="rating-wrap">
                        <div className="label-rating">132 reviews</div>
                        <div className="label-rating">154 orders </div>
                    </div>
                </figcaption>
                <div className="bottom-wrap">
                    <Link to={`/products/${_id}`} className="btn btn-sm btn-primary float-right">Detail</Link>
                    <div className="price-wrap h5">
                        <span className="price-new">${price}</span> <del className="price-old">$1980</del>
                    </div>
                </div>
            </figure>
        </div>
    );

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
};


export default ProductItem;
