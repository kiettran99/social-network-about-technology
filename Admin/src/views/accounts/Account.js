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
  { key: "action", label: "STATUS", _style: { width: "10%" } },
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


  const lockAcc = async (id) => {
    return Axios.put(`https://tlcn-social-network-api.herokuapp.com/api/users/look/${id}`).then(res => {
      return res.data;
    }).catch(err => {
      if (err) {
        console.log(err);
      }
    })
  }

  const unlockAcc = async (id) => {
    return Axios.put(`https://tlcn-social-network-api.herokuapp.com/api/users/unlook/${id}`).then(res => {
      return res.data;
    }).catch(err => {
      if (err) {
        console.log(err);
      }
    })
  }

  const getUser = async () => {
    try {
      const res = await Axios.get('https://tlcn-social-network-api.herokuapp.com/api/users');
      setUsers(res.data);
      console.log(res.data)
    }
    catch (error) {

    }
  }


  const disableBtn = async (id) => {
    //const users = this.state.status;
    //let user;
    const userLook = await lockAcc(id);
    //this.setState({ loading: true })
    setUsers(users.map(user => {
      if (user._id === id) {
        return userLook;
      }

      return user;
    }));
    // console.log(user);
    // if (user.status === "1") {
    //   user.forEach(item => {
    //     if (item.id === id) {
    //       item.status = '2'
    //     }
    //   });
    //   this.setState({ user: users, loading: false });
  }
  const enableBtn = async (id) => {
    const userUnLook = await unlockAcc(id);

    setUsers(users.map(user => {
      if (user._id === id) {
        return userUnLook;
      }

      return user;
    }));

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
              action: (item) => (
                <div class="btn-group" role="group" aria-label="Basic example">
                  {item.status === 1 ? <button type="button" class="btn btn-warning"
                    onClick={() => disableBtn(item._id)}>Khóa</button> :
                    <button type="button" class="btn btn-success"
                      onClick={() => enableBtn(item._id)}>Mở Khóa</button>
                  }
                </div>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default Account;
