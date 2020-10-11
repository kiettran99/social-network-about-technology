import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../../actions/product';
import { withRouter } from 'react-router-dom';

const AddProduct = ({ addProduct, history }) => {

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        manufacturer: '',
        category: '',
        conditionProduct: '',
        quantity: '',
        image: null
    });

    const {
        name,
        price,
        description,
        manufacturer,
        category,
        conditionProduct,
        quantity,
        image,
    } = formData;

    const onSubmit = (e) => {
        e.preventDefault();

        if (!image) {
            return alert("Please upload image !");
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('manufacturer', manufacturer);
        formData.append('category', category);
        formData.append('conditionProduct', conditionProduct);
        formData.append('quantity', quantity);
        formData.append('image', image);

        addProduct(formData, history);
    };

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="container">
            <form onSubmit={e => onSubmit(e)}
                className="form-horizontal" encType="multipart/form-data">
                <fieldset>
                    <legend className="ml-3">PRODUCTS</legend>
                    <div className="form-group">
                        <label className="col-md-4 control-label" for="product_name">Product Name</label>
                        <div className="col-md-4">
                            <input id="product_name"
                                onChange={e => onChange(e)}
                                value={name}
                                name="name" className="form-control input-md" required={true} type="text" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Unit Price">Unit Price</label>
                        <div className="col-md-4">
                            <input id="Unit Price" name="price"
                                onChange={e => onChange(e)}
                                value={price}
                                placeholder="" className="form-control input-md" required={true}
                                type="text" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Units In Stock">Units In Stock</label>
                        <div className="col-md-4">
                            <input id="Units In Stock"
                                onChange={e => onChange(e)}
                                value={quantity}
                                name="quantity" placeholder="" className="form-control input-md" required={true}
                                type="number" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Condition Product">Condition Product</label>
                        <div className="col-md-4">
                            <input id="Condition Product"
                                onChange={e => onChange(e)}
                                value={conditionProduct}
                                name="conditionProduct" placeholder="" className="form-control input-md" required={true}
                                type="text" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Description">Description</label>
                        <div className="col-md-4">
                            <textarea id="Description" name="description"
                                onChange={e => onChange(e)}
                                value={description}
                                className="form-control input-md"
                                required={true} type="text"></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Manufacturer">Manufacturer</label>
                        <div className="col-md-4">
                            <input id="Manufacturer"
                                onChange={e => onChange(e)}
                                value={manufacturer}
                                name="manufacturer" className="form-control input-md"
                                required={true} type="text" />

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" for="Category">Category</label>
                        <div className="col-md-4">
                            <textarea className="form-control"
                                onChange={e => onChange(e)}
                                value={category}
                                id="Category" name="category"></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" for="filebutton">main_image</label>
                        <div className="col-md-4">
                            <input id="filebutton" name="image" className="input-file" type="file"
                                onChange={e => {
                                    e.preventDefault();
                                    const image = e.target.files[0];

                                    setFormData({
                                        ...formData,
                                        image
                                    })
                                }} />
                        </div>
                    </div>

                    {image && <div className="form-group">
                        <img width={300} height={200} src={URL.createObjectURL(image)} />
                    </div>
                    }


                    <div className="form-group">
                        <div className="col-md-4">
                            <button id="singlebutton" type="submit" name="singlebutton" className="btn btn-primary">Add Product</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default connect(null, { addProduct })(withRouter(AddProduct));