import React, { lazy, Suspense, useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CLink
} from '@coreui/react';
import "./style.css";
import { getCollaborators, inviteToCollaborators, removeCollaborators } from "src/services/collaborator";
import InviteUser from '../../reusable/InviteUser';

const DialogBox = lazy(() => import('../../reusable/DialogBox'));

const fields = [
    // { key: "id", label: "INDEX", _style: { width: "5%" } },
    { key: "fullname", label: "Full Name", _style: { width: "15%" } },
    { key: "username", label: "Username", _style: { width: "15%" } },
    { key: "email", label: "Email", _style: { width: "20%" } },
    { key: "action", label: "ACTION", _style: { width: "10%" } },
];

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Collaborator = () => {

    const [users, setUsers] = useState([]);
    const [collaborators, setCollaborators] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);

    const history = useHistory();

    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/collaborators?page=${newPage}`)
    }

    useEffect(() => {
        getCollaborators().then((data) => {
            setUsers(data);
            setCollaborators(data);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    const reload = () => {
        getCollaborators().then((data) => {
            setCollaborators(data);
            setUsers(data);
           
            //findByName('');
        }).catch((e) => {
            console.log(e);
        });
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleRemoveCollaborator = (e, userId) => {

        const confirm = window.confirm('Are you sure remove this user ?');

        if (confirm) {
            removeCollaborators(userId).then((data) => {
                if (data) {
                    reload();
                }
            }).catch((e) => {
                console.log(e);
                alert('Not Sucessfully remove. Please try again. !');
            });
        }
    }

    const findByName = (name = '') => {
        if (name === '') {
            return setCollaborators(users);
        }

        setCollaborators(users.filter(user => user.fullname.toLowerCase().includes(name.toLowerCase())));
    }

    return (
        <>
            <CCard>
                <CCardHeader className=" CCardHeader-title">
                    <h4 className="text-muted">Collaborator</h4>
                    <div className="d-flex justify-content-between mt-sm-2">
                        <input className="form-control float-left w-50" placeholder="Find by name"
                            onChange={e => findByName(e.target.value)} />
                        <button className="float-right btn btn-primary"
                            onClick={() => openModal()}>+ Add collaborator</button>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={collaborators}
                        fields={fields}
                        hover
                        striped
                        pagination
                        itemsPerPage={5}
                        activePage={page}
                        clickableRows
                        // onRowClick={(item) => history.push(`/users/${item._id}`)}
                        scopedSlots={{
                            'status':
                                (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status}
                                        </CBadge>
                                    </td>
                                ),
                            'action':
                                (item) => (
                                    <td>
                                        <button className="btn btn-primary mt-1"
                                            onClick={() => {
                                                history.push(`/users/${item?._id}`)
                                            }}>
                                            Detail
                                        </button>

                                        <button className="btn btn-danger mt-1 ml-sm-2"
                                            onClick={(e) => handleRemoveCollaborator(e, item?._id)}>
                                            Remove
                                        </button>
                                    </td>

                                )
                        }}
                    />
                </CCardBody>
            </CCard>
            <Suspense fallback={<div></div>}>
                <DialogBox props={{
                    modalIsOpen, closeModal, openModal,
                    configs: {
                        title: 'Invite User To Collaborator',
                        action: (selectedUser, setMessage, setWating) => {
                            setWating(true);

                            const body = {
                                users: selectedUser.map(user => user._id)
                            };

                            inviteToCollaborators(body).then(data => {
                                if (data) {
                                    setMessage('Sucessfully invited.');

                                    reload();

                                    setTimeout(() => {
                                        closeModal();
                                    }, 2000);

                                    return;
                                }
                                else {
                                    setMessage('Not Sucessfully invite, Please try again.');
                                }
                            }).catch((e) => {
                                console.log(e);
                            }).finally(() => {
                                setWating(false);
                            })
                        }
                    }
                }}
                    Component={InviteUser} />
            </Suspense>
        </>
    );
};

export default Collaborator;