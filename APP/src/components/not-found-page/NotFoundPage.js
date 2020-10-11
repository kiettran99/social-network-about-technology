import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div className='m-auto container' style={{ width: "80%" }}>

        <div className='row not-found-row'>
            <div className='col'>
                <img src={"https://thumbs.dreamstime.com/b/bot-icon-chatbot-cute-outline-robot-vector-flat-line-cartoon-illustration-isolated-white-background-voice-support-service-123217587.jpg"}
                    alt="robot=not-found"
                    style={{ height: '18.75rem' }} />
            </div>

            <div className='col not-found-col'>
                <div className='ma-4'>
                    <h1 className='text-primary'>404 NOT FOUND</h1>
                </div>

                <div className='ma-4'>
                    <p className='text-primary'>
                        We looked everywhere for this page. Are you sure the website URL is correct?.
                        Get in touch with the site owner.
                </p>
                </div>

                <Link to='/' className='btn btn-outline-primary'>Go Back Home</Link>
            </div>
        </div>


    </div>
);

export default NotFoundPage;