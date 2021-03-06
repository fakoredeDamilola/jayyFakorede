import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import axios from "axios"
import Popup from "../layout/Popup"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"
class Login extends Component {
  state = {
    email: "",
    password: "",
    show: false,
    popup: false,
    loading: false,
    popupColor: "",
    popupData: ""
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  };
  submitBtn = (e) => {
    e.preventDefault();
    let info = { email: this.state.email, password: this.state.password }
    this.setState({ loading: true })
    axios.post("/api/auth/login", info)
      .then(data => {
        this.setState({ loading: false })
        let tokenVal;
        let dataKeys = Object.keys(data.data)
        if (dataKeys[0] === "token") {

          this.setState({
            popup: true,
            popupData: "Successfully logged in",
            popupColor: "info",
            password: "",
            email: ""
          })
          let logObj = { logged: true }

          tokenVal = []
          tokenVal.push(data.data)
          tokenVal.push(logObj)
          localStorage.setItem("token", JSON.stringify(tokenVal))
          window.location.reload(false)
          this.props.history.push("/");
        } else if (dataKeys[0] === "message") {
          this.setState({
            popup: true,
            popupData: "wrong username and password try again",
            popupColor: "danger"
          })
          let logObj = { logged: false }

          tokenVal = []
          tokenVal.push({})
          tokenVal.push(logObj)
          localStorage.setItem("token", JSON.stringify(tokenVal))
        }
      })
  };
  togglePassword = (e) => {
    let password = document.querySelector(".password")
    this.setState({ show: !this.state.show })
    this.state.show ? password.setAttribute("type", "text") : password.setAttribute("type", "password")
    let btn = document.querySelector(".passwordBtn i")
    this.state.show ? btn.className = "fa fa-eye" : btn.className = "fa fa-eye-slash"
  }
  closeAlert = () => {
    this.setState({ popup: false })
  }
  render() {
    return !this.state.loading ? (
      <div
        style={{
          backgroundImage: `url(${img1})`,
          backgroundPosition: "left",
          backgroundSize: "cover",

        }}
      >
        <div className="login-body">
          <div>

            <div className="login-header">
              <span>J A Y Y</span> <span>F A K O R E D E</span>
            </div>
            <div className="login-center">
              {
                this.state.popup &&
                <Popup
                  color={this.state.popupColor} data={this.state.popupData}
                  closeAlert={this.closeAlert}
                />
              }
              <div className="field">
                <label htmlFor="E-mail">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  className="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <button className="passwordBtn" onClick={this.togglePassword}>
                  {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                </button>
              </div>
              <div className="submit">
                <input
                  type="submit"
                  value="log in"
                  className="submitBtn"
                  onClick={this.submitBtn}
                />

              </div>
              <div className="linkInfo">
                <Link to="/signup">Signup</Link>
              </div>

            </div>
          </div>
        </div>
      </div>

    ) : (
        <div>
          <Spinner value="validating credentials...." />
        </div>
      )

  }
}
export default Login;
