import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import axios from "axios"
import Spinner from "../layout/Spinner";
import Popup from "../layout/Popup"
import { Link } from "react-router-dom"
class Signup extends Component {
    state = {
        email: "",
        password: "",
        secretInfo: "",
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
        let info = { email: this.state.email, password: this.state.password, secretInfo: this.state.secretInfo }

        this.setState({ loading: true })
        axios.post("/api/auth/create/user", info)
            .then(data => {
                this.setState({ loading: false })
                if (data.data === "secret key is wrong") {
                    this.setState({
                        popup: true,
                        popupData: data.data,
                        popupColor: "danger",
                    })
                } else {
                    this.setState({
                        popup: true,
                        popupData: data.data,
                        popupColor: "info",
                        password: "",
                        email: ""
                    })
                    // this.props.history.push("/login");
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
                                <label htmlFor="secretInfo">Secret Info</label>
                                <input
                                    type="text"
                                    name="secretInfo"
                                    value={this.state.secretInfo}
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
                                    value="create user"
                                    className="submitBtn"
                                    onClick={this.submitBtn}
                                />
                            </div>
                            <div className="linkInfo">
                                <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        ) : (
                <div>
                    <Spinner value="Validating data..." />
                </div>
            )
    }
}
export default Signup;
