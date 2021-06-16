import React from 'react';

const StartChat = () => {

    const onStartChat = () => {
        // Get channel and get first 
        const $channel = document.getElementsByClassName('chat-channel');

       if ($channel && $channel.length > 0) {
            $channel[0].click();
       }
    }

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
                        <button id="chat-start" className="btn bg-white mt-3"
                            onClick={onStartChat}>Start
                            Conversation!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartChat;