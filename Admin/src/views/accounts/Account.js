import React, { lazy, useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
} from "@coreui/react";
import "./style.css";
import CIcon from "@coreui/icons-react";

import Axios from "axios";
const fields = [
  // { key: "id", label: "INDEX", _style: { width: "5%" } },
  { key: "fullname", label: "FULL NAME", _style: { width: "15%" } },
  { key: "username", label: "USERNAME", _style: { width: "15%" } },
  //{ key: "address", label: "ADDRESS", _style: { width: "23%" } },
  { key: "email", label: "EMAIL", _style: { width: "20%" } },
  //{ key: "phone", label: "PHONE", _style: { width: "17%" } },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
  // { key: "registered", _style: { width: "40%" } },
  // "role",
  // "status",
];
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

function Account() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await Axios.get('https://tlcn-social-network-api.herokuapp.com/api/users');
      setUsers(res.data);
      console.log(res.data)
    }
    catch (error) {

    }
  }



  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Account</CCardHeader>
        <CCardBody>
          <CDataTable
            items={users}
            fields={fields}
            striped
            itemsPerPage={8}
            pagination
            scopedSlots={{
              index: (item) => <td>{item.id}</td>,
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              action: () => (
                <td style={{ display: "flex", justifyContent: "start" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      justifyContent: "space-between",
                    }}
                  >
                    <CLink className="c-subheader-nav-link" href="#">
                      <CIcon name="cil-pencil" alt="Edit" />
                      {/* &nbsp;Edit */}
                    </CLink>
                    <CLink className="c-subheader-nav-link" href="#">
                      <CIcon
                        style={{ color: "red" }}
                        name="cil-trash"
                        alt="Delete"
                      />
                      {/* &nbsp;Edit */}
                    </CLink>
                  </div>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default Account;
