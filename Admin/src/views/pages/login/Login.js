import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import setAuthToken from '../../../setAuthToken';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',

    };
  }
  componentDidMount() {
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();

    // Ajax login
    fetch('https://tlcn-social-network-api.herokuapp.com/api/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    }
    )
      .then(res => res.json())
      .then((data) => {
        // Store token into local storage
        localStorage.setItem('Token', data.token);

        // Attach token to axios'header
        setAuthToken(data.token);

        // Update state
        this.setState({
          resData: data.token,
          isAuthenticated: !!data.token
        });
      }).catch((error) => {
        console.log(error);
        this.setState({
          isAuthenticated: false,
        }
        )
      });
  }
  render() {
    return (

      <div className="c-app c-default-layout flex-row align-items-center">
        {this.state.isAuthenticated ? <Redirect to='/dashboard' /> : null}
        <CContainer>

          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CForm onSubmit={this.handleSubmit}>
                      <h1>ADMIN LOGIN</h1>
                      <p className="text-muted">Sign In to admin account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          name="username"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.handleChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="12">
                          <CButton color="primary" type="submit" style={{ width: "100%" }}>
                            Login
                        </CButton>
                        </CCol>
                        {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white d-md-down-none">
                  <CImg
                    src={"img/login_bg.jpg"}
                    style={{ width: "100%", height: "auto" }}
                  // fluid
                  // className="mb-2"
                  />
                  {/* <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>

                </CCardBody> */}
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );

  };
}

export default Login;
