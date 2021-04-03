import React, { useRef, useState } from 'react';

const Footer = ({ socket, match }) => {

    const inputRef = useRef();
    const [isDisabledButton, setDisableButton] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const text = inputRef.current.value;

        setDisableButton(true);

        socket.emit('sendMessage', { text, recipient: match.params.id }, (error) => {

            inputRef.current.value = '';
            inputRef.current.focus();

            setDisableButton(false);

            if (error) {
                return console.log(error);
            }

            console.log('Message delivered!');
        });
    }

    return (
        <div className="chat-footer p-3 bg-white">
            <form className="d-flex align-items-center"
                onSubmit={onSubmit}>
                <div className="chat-attagement d-flex">
                    <a href="#"><i className="ri-user-smile-line pr-3" aria-hidden="true" /></a>
                    <a href="#"><i className="ri-attachment-2 pr-3" aria-hidden="true" /></a>
                </div>
                <input
                    ref={inputRef}
                    type="text" className="form-control mr-3" placeholder="Type your message" />
                <button type="submit"
                    disabled={isDisabledButton}
                    className="btn btn-primary d-flex align-items-center p-2"><i className="ri-send-plane-fill" aria-hidden="true" /><span className="d-none d-lg-block ml-1">Send</span></button>
            </form>
        </div>
    );
};

export default Footer;