import React, { useEffect } from 'react';

const CreateShop = ({ shop, setShop }) => {

    useEffect(() => {
        if (shop) {
            setShop(shop);
        }
    }, [shop]);

    const onChange = (e) => {
        setShop(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    return (
        <div>
            <div className="form-group">
                <p>Price</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input type="number"
                        name="price"
                        className="form-control" aria-label="Amount (to the nearest dollar)"
                        onChange={onChange}
                        value={shop.price} />
                </div>
            </div>

            <div className="form-group">
                <p>Link (optional)</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ri-attachment-line"></i></span>
                    </div>
                    <input type="text"
                        name="link"
                        className="form-control" aria-label="Link (Product that you bought.)"
                        onChange={onChange}
                        value={shop.link} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(CreateShop);