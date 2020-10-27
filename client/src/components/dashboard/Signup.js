import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import axios from "axios"
class Signup extends Component {
    state = {
        email: "",
        password: "",
        secretInfo: "",
        show: false
    };
    componentWillUpdate() {
        let btn = document.querySelector(".passwordBtn i")
        this.state.show ? btn.className = "fa fa-eye" : btn.className = "fa fa-eye-slash"

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    };
    submitBtn = async (e) => {
        e.preventDefault();
        let info = { email: this.state.email, password: this.state.password, secretInfo: this.state.secretInfo }
        let token
        console.log(info)
        let data = await axios.post("http://localhost:4000/api/auth/create/user", info)

        let tokenVal;

        let dataKeys = Object.keys(data.data)
        if (data.data === "secret key is wrong") {
            alert("secret key is wrong")
        } else {
            this.props.history.push("/login");
        }


    };
    togglePassword = (e) => {
        let password = document.querySelector(".password")
        this.setState({ show: !this.state.show })
        this.state.show ? password.setAttribute("type", "text") : password.setAttribute("type", "password")
    }
    render() {
        return (
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signup;
