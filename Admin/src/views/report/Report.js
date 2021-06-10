import React, { lazy, useEffect, useState } from "react";
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

import { getReports } from "src/services/report";
import CIcon from "@coreui/icons-react";

import ReportDetail from './ReportDefail';

const DialogBox = lazy(() => import('../../reusable/DialogBox'));

const fields = [
    // { key: "id", label: "INDEX", _style: { width: "5%" } },
    { key: "requester", label: "Requester", _style: { width: "15%" } },
    { key: "type", label: "Type", _style: { width: "15%" } },
    { key: "description", label: "Description", _style: { width: "20%" } },
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

const Report = () => {

    const [reports, setReports] = useState([]);
    const [detail, setDetail] = useState(null);

    const [modalIsOpen, setIsOpen] = useState(false);

    const history = useHistory();

    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/reports?page=${newPage}`)
    }

    useEffect(() => {
        getReports().then((data) => {
            setReports(data.map(report => {
                return {
                    ...report,
                    requester: report.owner?.fullname || ''
                }
            }));
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            <CCard>
                <CCardHeader className=" CCardHeader-title">
                    Reports
            </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={reports}
                        fields={fields}
                        hover
                        striped
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
                                    <button className="btn btn-primary mt-1"
                                        onClick={() => {
                                            setDetail(item);
                                            openModal();
                                        }}>
                                        Detail
                                    </button>
                                )
                        }}
                    />
                    <CPagination
                        activePage={page}
                        onActivePageChange={pageChange}
                        pages={reports.length}
                        doubleArrows={false}
                        align=""
                    />
                </CCardBody>
            </CCard>
            <DialogBox props={{
                modalIsOpen, closeModal, openModal,
                detail
            }} Component={ReportDetail} />
        </>
    );
}

export default Report;
