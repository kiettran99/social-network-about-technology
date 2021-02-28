import React, { useEffect, useState } from 'react';
import { getFaqs } from './api/faqServices';

const Faq = () => {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        getFaqs().then(result => setFaqs(result));
    }, []);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card position-relative inner-page-bg bg-primary" style={{ height: '150px' }}>
                            <div className="inner-page-title">
                                <h3 className="text-white">Frequently Asked Questions</h3>
                                {/* <p className="text-white">lorem ipsum</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        {faqs && faqs.length > 0 && faqs.map(faq => (
                            <div key={faq._id} className="iq-accordion career-style faq-style">
                                <div className="iq-card iq-accordion-block ">
                                    <div className="active-faq clearfix">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-12"><a className="accordion-title"><span>{faq.question}</span> </a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-details">
                                        <p className="mb-0">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;