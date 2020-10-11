import React, { useContext } from 'react';
import CommentItem from './CommentItem';

import ProductContext from '../../../contexts/ProductContext';

const CommentsList = () => {

    const { comments, productId } = useContext(ProductContext);

    return comments && comments.map(comment => (
        <CommentItem key={comment._id} productId={productId} comment={comment} />
    ));
}

export default CommentsList;