import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Axios from 'axios';

export default class Addgroup extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onChangeAvt = this.onChangeAvt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      info: '',
      avatar: null
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAvt(e) {
    this.setState({
      avatar: e.target.files[0]
    });
  }
  onChangeInfo(e) {
    this.setState({
      info: e.target.value
    });
  }
  async onSubmit(e) {
    e.prevenDefault();

    // Đổi về dạng form data do có hình
    const body = {
      name: this.setState.name,
      info: this.setState.info,
      avatar: this.setState.avatar
    };

    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('info', body.info);

    if (body.avatar) {
      formData.append('avatar', body.avatar);
    }

    const res = await Axios.post('http://tlcn-social-network-api.herokuapp.com/api/groups', formData)
    
    if (res.data.errorCode > 0) {
      return alert(res.response.data);
    }

    this.setState({
      name: '',
      info: '',
      avatar: null
    });

    return alert('Add sucessfully');
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.onSubmit}>
                    <h1>Create Groups</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="name" autoComplete="name" value={this.state.name}
                        onChange={this.onChangeName} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="info" autoComplete="info" value={this.state.info}
                        onChange={this.onChangeInfo} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="file" placeholder="Avatar" autoComplete="new-avater" value={this.state.avatar} onChange={this.onChangeAvt} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>

                      </CInputGroupPrepend>
                    </CInputGroup>
                    <CButton color="success" block>Create Groupt</CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}