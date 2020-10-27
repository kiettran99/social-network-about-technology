import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div id="content-page" className="content-page" >
            <div className="wrapper mt-5">
                <div className="mt-5 iq-maintenance">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-sm-12 text-center">
                                <div className="iq-maintenance">
                                    <img src="images/error/02.png" className="img-fluid w-50" alt="" />
                                    <div className='ma-4'>
                                        <h1 className='text-primary'>404 NOT FOUND</h1>
                                    </div>

                                    <div className='ma-4'>
                                        <p className='text-muted'>
                                            We looked everywhere for this page. Are you sure the website URL is correct?.
                                            Get in touch with the site owner.
                                        </p>

                                    <Link to='/' className='btn btn-outline-primary'>Go Back Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;