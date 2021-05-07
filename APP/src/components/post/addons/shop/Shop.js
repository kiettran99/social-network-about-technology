import React from 'react';
import { useHistory } from 'react-router-dom';

const Shop = ({ shop, userId }) => {

    const history = useHistory();

    const handleForwardChatPage = () => {
        history.push(`/messages/${userId}`);
    };

    return (
        <div className="bg-light p-1 mt-3 rounded form-group">
            <div className="d-flex justify-content-between">
                <div className="ml-3 mt-2">
                    <h4>Contact with Buyer</h4>
                    {shop.price && (
                        <p>Price: ${shop.price}</p>
                    )}
                    {shop.link && (
                        <p>Link: ${shop.link}</p>
                    )}
                </div>
                <div className="my-auto mr-2">
                    <button type="button" className="btn btn-primary"
                        onClick={() => handleForwardChatPage()}>Inbox</button>
                </div>
            </div>
        </div>
    );
};

export default Shop;