import React, { useMemo } from 'react';

const ProductDescription = ({ product }) => {

    const productDescription = useMemo(() => (
        <div className="row no-gutters">
            <aside className="col-lg-6 col-md-12">
                <article className="gallery-wrap rounded">
                    <div className="img-big-wrap">
                        <a href="#">
                            <img className="product-image rounded" src={product.imageUrl} />
                        </a>
                    </div>
                    {/* <div className="thumbs-wrap">
                        <a href="" className="item-thumb"> <img src="bootstrap-ecommerce-html/images/items/12.jpg" /></a>
                        <a href="" className="item-thumb"> <img src="bootstrap-ecommerce-html/images/items/12-1.jpg" /></a>
                        <a href="" className="item-thumb"> <img src="bootstrap-ecommerce-html/images/items/12-2.jpg" /></a>
                    </div> */}
                </article>
            </aside>
            <main className="col-lg-6 col-md-12 p-5">
                <article className="content-body">

                    <h2 className="title">{product.name}</h2>

                    <div className="rating-wrap my-3">
                        <ul className="rating-stars" style={{ listStyleType: "none" }}>
                            <li style={{ width: "80%" }} className="stars-active">
                                <small className="label-rating text-muted">132 reviews</small>
                                <i className="fas fa-star text-primary"></i> <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i> <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i>
                            </li>
                            <li>
                                <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> 154 orders</small>
                                <i className="fas fa-star text-primary"></i> <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star text-primary"></i> <i className="fas fa-star text-primary"></i>
                                <i className="fas fa-star"></i>
                            </li>
                        </ul>

                    </div>

                    <div className="mb-3">
                        <var className="price h4">${product.price}</var>
                    </div>

                    <p className="text-muted">{product.description}</p>


                    {/* <dl className="row">
                        <dt className="col-sm-3">Model#</dt>
                        <dd className="col-sm-9">Odsy-1000</dd>

                        <dt className="col-sm-3">Color</dt>
                        <dd className="col-sm-9">Brown</dd>

                        <dt className="col-sm-3">Delivery</dt>
                        <dd className="col-sm-9">Russia, USA, and Europe </dd>
                    </dl> */}

                    <hr />
                    <div className="form-row">
                        <div className="form-group col-md flex-grow-0">
                            <label>Quantity</label>
                            <input id="quantity" name="quantity" type="number" defaultValue={1} min={0} max={product.quantity} className="form-control" />
                        </div>
                        {/* <div className="form-group col-md">
                            <label>Select size</label>
                            <div className="mt-1">
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="select_size" className="custom-control-input" />
                                    <div className="custom-control-label">Small</div>
                                </label>

                                <label className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="select_size" className="custom-control-input" />
                                    <div className="custom-control-label">Medium</div>
                                </label>

                                <label className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" name="select_size" className="custom-control-input" />
                                    <div className="custom-control-label">Large</div>
                                </label>

                            </div>
                        </div> */}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <a href="#" className="btn btn-primary mr-2"> Buy now </a>
                        </div>

                        <div className="form-group">
                            <a href="#" className="btn btn-outline-primary"> <span className="text">Add to cart</span> <i
                                className="fas fa-shopping-cart"></i> </a>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    ), []);

    return productDescription;
};

export default ProductDescription;