import React from 'react';

const StartChat = () => {
    return (
        <div className="col-lg-9 chat-data p-0 chat-data-right">
            <div className="tab-content">
                <div className="tab-pane fade" id="default-block" role="tabpanel">
                    <div className="chat-start">
                        <span className="iq-start-icon text-primary"><i className="ri-message-3-line" /></span>
                        <button id="chat-start" className="btn bg-white mt-3">Start
                    Conversation!</button>
                    </div>
                </div>
                <div className="tab-pane fade active show" id="default-block" role="tabpanel">
                    <div className="chat-start">
                        <span className="iq-start-icon text-primary"><i className="ri-message-3-line" /></span>
                        <button id="chat-start" className="btn bg-white mt-3">Start
            Conversation!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartChat;