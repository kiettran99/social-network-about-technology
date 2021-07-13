import React, { useEffect } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Toolbar = ({ privacy, edit = false }) => {

    const [status, setStatus] = useLocalStorage('post-privacy', 1);

    useEffect(() => {
        if (edit && privacy.current) {
            setStatus(privacy.current);
        }
    }, [privacy]);

    useEffect(() => {
        privacy.current = status;
    }, [status]);

    const display = () => {
        switch (status) {
            case 0:
                return 'Only Me';
            case 2:
                return 'Firend';
            case 1:
            default:
                return 'Public';
        }
    };

    const onHandleChoosePrivacy = (e, status) => {
        e.preventDefault();

        setStatus(status);
    }

    return (
        <div className="iq-card-post-toolbar">
            <div className="dropdown">
                <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                    <span className="btn btn-primary">{display()}</span>
                </span>
                <div className="dropdown-menu m-0 p-0">
                    <a className="dropdown-item p-3" href="#"
                        onClick={(e) => onHandleChoosePrivacy(e, 1)}>
                        <div className="d-flex align-items-top">
                            <div className="icon font-size-20"><i className="ri-earth-line" /></div>
                            <div className="data ml-2">
                                <h6>Public</h6>
                                <p className="mb-0">Anyone on or off Facebook</p>
                            </div>
                        </div>
                    </a>
                    <a className="dropdown-item p-3" href="#"
                        onClick={(e) => onHandleChoosePrivacy(e, 2)}>
                        <div className="d-flex align-items-top">
                            <div className="icon font-size-20"><i className="ri-group-line" /></div>
                            <div className="data ml-2">
                                <h6>Friends</h6>
                                <p className="mb-0">Your Friend on facebook</p>
                            </div>
                        </div>
                    </a>
                    {/* <a className="dropdown-item p-3" href="#"
                        onClick={onHandleChoosePrivacy}>
                        <div className="d-flex align-items-top">
                            <div className="icon font-size-20"><i className="ri-user-unfollow-line" /></div>
                            <div className="data ml-2">
                                <h6>Friends except</h6>
                                <p className="mb-0">Don't show to some friends</p>
                            </div>
                        </div>
                    </a> */}
                    <a className="dropdown-item p-3" href="#"
                        onClick={(e) => onHandleChoosePrivacy(e, 0)}>
                        <div className="d-flex align-items-top">
                            <div className="icon font-size-20"><i className="ri-lock-line" /></div>
                            <div className="data ml-2">
                                <h6>Only Me</h6>
                                <p className="mb-0">Only me</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Toolbar;