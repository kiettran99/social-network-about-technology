import React, { useState } from 'react';

import data from './service/data';
import { createReport } from './service/report';

const Report = ({ closeModal, postId, ...rest }) => {

    const [issues, setIssues] = useState(data);

    const [message, setMessage] = useState(null);
    const [isWaiting, setWating] = useState(false);

    // Extentsion Report User or Group
    const [images, setImages] = useState([]);

    // Object Destructuring
    const { targetId, type = 'Post', onDropImages, ImageUploader } = rest;

    const onHandleClick = (issueId) => {
        setIssues(issues.map(issue => ({
            ...issue,
            status: issueId === issue._id
        })))
    };

    const onReportPost = () => {

        const formData = new FormData();

        formData.append('target', postId || targetId);
        formData.append('type', type);
        formData.append('description', issues.find(issue => issue.status)?.description);

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append(`images`, image);
            })
        }

        setWating(true);

        createReport(formData).then((report) => {
            if (report) {
                setWating(false);
                setMessage({ description: 'Report successfully. Thanks you your reporting.', status: 'success' });

                // Automatically close modal 2s
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }

        }).catch(() => {
            setWating(false);
            setMessage({ description: 'Report not Successfully. Please try again later.', status: 'danger' });
        });
    }

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

                    {type !== 'Post' && ImageUploader && (
                        <div className="form-group">
                            <h5>Please Send More Context</h5>
                            <br />
                            <React.Suspense fallback={<div>Loading Upload Images....</div>}>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={(pictureFiles) => onDropImages(pictureFiles, setImages)}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                            </React.Suspense>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    {message && (
                        <div className="form-group">
                            <span className={`text-${message.status}`}>{message.description}</span>
                        </div>
                    )}
                    {isWaiting ? (
                        <button type="button" className="btn btn-primary mr-2" disabled={true}>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary"
                            onClick={onReportPost}
                        >Report</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Report);