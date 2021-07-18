import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from '../../../../utils/relativeDate';

const ParseHtml = React.lazy(() => import('../../../shared/ParseHtml'));

const Channel = ({ previewMessageBox }) => {

    const user = useSelector((state) => {
        return state.auth.user
    });

    const history = useHistory();

    const onHandleClickNextPage = (id) => {
        return history.push(`/messages/${id}`);
    };

    const previewOnMessage = (preview) => {
        const messages = preview.messageBox.messages;

        if (messages && user) {
            const isAsRead = messages.status.find((object => object.user === user._id))?.isAsRead;

            return <small className={`${isAsRead ? '' : 'font-weight-bold'}`}><ParseHtml text={preview.messageBox.messages?.text} length={14} shouldTruncate={true} byWords={false} /></small>
        }

        return <small><ParseHtml text={preview.messageBox.messages?.text} length={14} shouldTruncate={true} byWords={false} /></small>
    }

    return (
        <ul className="iq-chat-ui nav flex-column nav-pills">
            {previewMessageBox && previewMessageBox.map(preview => (
                <li key={preview._id}
                    onClick={() => onHandleClickNextPage(preview.recipient._id)}
                    className="chat-channel">
                    <a data-toggle="pill" href="chat.html#chatbox1">
                        <div className="d-flex align-items-center">
                            <div className="avatar mr-2">
                                <img src={preview.recipient.avatar} alt="chatuserimage" className="avatar-50 rounded-circle" />
                                {preview.recipient.available && <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>}
                            </div>
                            <div className="chat-sidebar-name">
                                <h6 className="mb-0">{preview.recipient.fullname}</h6>
                                {previewOnMessage(preview)}
                            </div>
                            <div className="chat-meta float-right text-center mt-2 mr-1">
                                <div className="chat-msg-counter bg-primary text-white">20</div>
                                <span className="text-nowrap">{dayjs(preview.messageBox.messages?.createdAt).fromNow(true)}</span>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(Channel);