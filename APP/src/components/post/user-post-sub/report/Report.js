import React, { useState } from 'react';
import data from './service/data';

const Report = ({ closeModal }) => {

    const [issues, setIssues] = useState(data);

    const [message, setMessage] = useState(null);
    const [isWaiting, setWating] = useState(false);

    const onHandleClick = (issueId) => {
        setIssues(issues.map(issue => ({
            ...issue,
            status: issueId === issue._id
        })))
    };

    return (
        <div className="modal-dialog modal-lg m-0" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Report Post</h4>
                    <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal"><i className="ri-close-fill m-0" /></button>
                </div>
                <div className="modal-body">
                    <div className="p-1">
                        <h5 className="mb-1">Please select an issue to continue</h5>
                        <p>You can report the post after selecting an issue.</p>
                        {issues && issues.length > 0 && issues.map((issue, index) => (
                            <button
                                key={index}
                                onClick={() => onHandleClick(issue._id)}
                                className={`btn mb-3 rounded-pill font-weight-bold ${issue.status ? 'btn-primary' : 'btn-light'}`}>
                                {issue.description}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    {message && (
                        <div className="form-group">
                            <span className="text-primary">{message}</span>
                        </div>
                    )}
                    {isWaiting ? (
                        <button type="button" className="btn btn-primary mr-2" disabled={true}>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                         Loading...
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary"
                        >Report</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Report;