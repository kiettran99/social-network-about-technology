import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from './UsersData'
import Account from '../accounts/Account'
import Axios from 'axios';

const User = ({ match }) => {

  useEffect(() => {
    getUser();
  }, [match.params.id]);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await Axios.get(`https://tlcn-social-network-api.herokuapp.com/api/users/${match.params.id}`);
      setUser(res.data);

    }
    catch (error) {
      console.log(error);
    }
  }

  // const user = (user => usersData.id === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  userDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td><strong>{value}</strong></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
