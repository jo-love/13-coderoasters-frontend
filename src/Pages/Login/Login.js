import React, { Component } from "react";
import "../Login/Login.scss";
import { Link, withRouter } from "react-router-dom";
import { APILogin } from "../../config";
import GoogleLogin from "react-google-login";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      activeId: 1,
      firstNameValue: "",
      lastNameValue: "",
      emailValue: "",
      mobileNumValue: "",
      pwValue: "",
    };
  }

  changeTap = (id) => {
    this.setState({ activeId: id });
  };

  handleInputValue = (inValue) => {
    this.setState({ [inValue.target.name]: inValue.target.value });
  };

  handleSignUpClick = () => {
    const {
      firstNameValue,
      lastNameValue,
      emailValue,
      mobileNumValue,
      pwValue,
    } = this.state;

    fetch(`${APILogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        mobile_number: mobileNumValue,
        password: pwValue,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("state", this.state);
        console.log("success message", response);
        if (response.message === "user created") {
          alert("SUCCESS SIGN UP");
          this.setState({ activeId: 2 });
        }
      });
  };

  handleLogInClick = (e) => {
    const { emailValue, pwValue } = this.state;

    fetch(`${APILogin}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: pwValue,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "login success!") {
          alert("Login SUCCESS!");
          localStorage.setItem("token", `bearer ${result.token}`);
          this.props.showLoginModal();
          this.props.history.push("/1");
        }
      });
  };
  responseGoogle = (response) => {
    console.log(response);
    fetch(`${APILogin}/users/googlelogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.tokenId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "login success!") {
          localStorage.setItem("token", `bearer ${result.token}`);
          alert("Login SUCCESS!");
          this.props.showLoginModal();
          this.props.history.push("/1");
        }
      });
  };

  render() {
    const {
      activeId,
      firstNameValue,
      lastNameValue,
      emailValue,
      pwValue,
    } = this.state;

    return (
      <div>
        {/* {this.props.isOpen ? ( */}
        <div className="Login">
          <div className="loginBox">
            <div className="btnClose">
              <button onClick={this.props.showLoginModal}>
                <img src="/Images/close-button.png" alt="closebutton" />
              </button>
            </div>
            <div className="accountBox">
              <button
                className={
                  activeId === 1 ? "accountButtonLine" : "accountButton"
                }
                onClick={() => this.changeTap(1)}
              >
                Sign Up
              </button>
              <button
                className={
                  activeId === 2 ? "accountButtonLine" : "accountButton"
                }
                onClick={() => this.changeTap(2)}
              >
                Log In
              </button>
            </div>
            <div className="loginContainer">
              <div className="inputBox">
                {activeId === 1 && (
                  <>
                    <input
                      className="nameBox"
                      type="text"
                      placeholder="First Name*"
                      name="firstNameValue"
                      value={firstNameValue}
                      onChange={this.handleInputValue}
                    />
                    <input
                      className="nameBox"
                      type="text"
                      placeholder="Last Name*"
                      name="lastNameValue"
                      value={lastNameValue}
                      onChange={this.handleInputValue}
                    />
                  </>
                )}
                <input
                  className="emailBox"
                  type="text"
                  placeholder="Email*"
                  name="emailValue"
                  value={emailValue}
                  onChange={this.handleInputValue}
                />
                {activeId === 1 && (
                  <input
                    className="mobileNumBox"
                    type="text"
                    placeholder="Mobile Number*"
                    name="mobileNumValue"
                    value={this.state.mobileNumValue}
                    onChange={this.handleInputValue}
                  />
                )}
                <input
                  className="psBox"
                  type="password"
                  placeholder="Password*"
                  name="pwValue"
                  value={pwValue}
                  onChange={this.handleInputValue}
                />
              </div>
              {activeId === 1 && (
                <div className="characterCheck">8 character minimum</div>
              )}
              <button
                className="signUpButton"
                type="submit"
                name="sign"
                onClick={
                  activeId === 1
                    ? this.handleSignUpClick
                    : this.handleLogInClick
                }
              >
                {activeId === 1 ? "SIGN UP" : "LOG IN"}
              </button>
              <button>
                <GoogleLogin
                  clientId="1050514458597-qmbe588bngrmgaoq8ars6tfs6na9em93.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="googleLogin"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <img src="/Images/google.png" />
                      Google Login
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </button>
            </div>
          </div>
        </div>
        {/* ) : null} */}
      </div>
    );
  }
}

export default withRouter(Login);
