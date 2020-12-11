import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Axios from 'axios';

const Editgroup = ({ match }) => {

  useEffect(() => {
    getGroup();
  }, [match.params.id]);

  const [group, setGroup] = useState(null);

  const getGroup = async () => {
    try {
      const res = await Axios.get(`https://tlcn-social-network-api.herokuapp.com/api/groups/${match.params.id}`);
      setGroup(res.data);

    }
    catch (error) {
      console.log(error);
    }
  }

  // const user = (user => usersData.id === match.params.id)
  const userDetails = group ? Object.entries(group) :
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

export default Editgroup
