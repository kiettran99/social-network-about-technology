import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import CommentsForm from './product-forms/CommentsForm';
import CommentsList from './product-comments/CommentsList';
import CommentsBar from './product-comments/CommentsBar';
import ProductContext from '../../contexts/ProductContext';
import { addComment } from '../../actions/product';
import { connect } from 'react-redux';

const ProductComments = ({ productId, likes, comments, addComment }) => {
    const actionComment = (formData) => {
        addComment(productId, formData);
    }

    const commentsForm = useMemo(() => <CommentsForm actionComment={actionComment} />, [actionComment]);

    return (
        <ProductContext.Provider value={{ productId, likes, comments }}>
            <CommentsBar />
            {commentsForm}
            <CommentsList />
        </ProductContext.Provider>
    );
};

export default connect(null, { addComment })(ProductComments);