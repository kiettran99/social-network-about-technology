import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeProduct, unlikeProduct } from '../../../actions/product';
import { withRouter } from 'react-router-dom';
import ProductContext from '../../../contexts/ProductContext';
import Following from './Following';

const CommentsBar = ({ likeProduct, unlikeProduct,
    auth: { user, isAuthenticated },
    history
}) => {

    const { productId, likes, comments: { length } } = useContext(ProductContext);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLiked(likes.filter(like => like.user === user._id).length > 0);
        }
        else {
            setIsLiked(false);
        }
    }, [isAuthenticated, likes]);

    const onLikeHandler = () => {
        if (!isAuthenticated) {
            history.push('/login');
        } else if (isLiked) {
            unlikeProduct(productId);
        }
        else {
            likeProduct(productId);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="shadow-sm p-1 bg-light mt-2 rounded">
            <button
                className="btn text-secondary ml-3"
                onClick={() => onLikeHandler()}>
                <span className={`${isLiked ? 'text-primary' : ''}`}>{likes && likes.length} <i className="fas fa-thumbs-up"></i></span></button>
            {/* <button className="btn text-secondary">2 <i className="fas fa-thumbs-down"></i></button> */}
            <button className="btn text-secondar">{length} <i className="fas fa-comments"></i></button>
            <Following productId={productId} />
        </div >
    );
}

CommentsBar.propTypes = {
    likeProduct: PropTypes.func.isRequired,
    unlikeProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { likeProduct, unlikeProduct })(withRouter(CommentsBar));