import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    auth: false,
    darkMode: false
  }
  UNSAFE_componentWillMount() {
    document.addEventListener("mousedown", this.showNav, false);
    if (localStorage.getItem("token") === null) {
      this.setState({ auth: false })
    } else {
      let auth = JSON.parse(localStorage.getItem("token"))
      this.setState({ auth: auth[1].logged })

    }

    const currentTheme = localStorage.getItem("theme")

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme)
      if (currentTheme === "dark") {
        this.setState({ darkMode: true })
      }
    }
  }

  UNSAFE_componentWillUnmount() {
    document.removeEventListener("mousedown", this.showNav, false);
  }
  showNav = (e) => {
    let menu = document.querySelector(".menu");
    // menu.classList.toggle("active");
    if (this.node.contains(e.target)) {
      menu.classList.add("active");
    } else if (menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  };
  selectClicked = (e) => {
    let li = document.querySelectorAll("li");
    // li.classList.add("actived");

    Array.from(li).forEach((l) => {
      l.classList.remove("actived");
      if (e.target.innerHTML === l.textContent) {
        l.classList.add("actived");
      }
      let menu = document.querySelector(".menu");
      menu.classList.remove("active");
    });
  };
  logout = (e) => {
    e.preventDefault();
    let logObj = { logged: false }
    let tokenVal;
    tokenVal = []
    tokenVal.push({})
    tokenVal.push(logObj)
    localStorage.setItem("token", JSON.stringify(tokenVal))
    window.location.reload(false)
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked })
    this.changeValue(e.target.checked)
  }
  changeValue = (check) => {

    if (check) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }
  render() {
    return (
      <div
        className="header"
        style={{ zIndex: "5555" }}
        ref={(node) => (this.node = node)}
      >
        <div className="header-top">
          <div className="logo" onClick={this.selectClicked.bind(this)}>

            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              Jayy Fakorede
            </Link>
          </div>
          <div className="menu-toggle" onClick={this.showNav}>
            <div className="bars-text">
              <div className="bars"></div>
              <div className="bars"></div>
              <div className="bars"></div>
            </div>
          </div>
        </div>

        <nav>
          <ul className="menu">

            {this.state.auth ?
              <li onClick={this.selectClicked.bind(this)} className="checkAuth">
                <Link to="/profile/addCategory" >ADD CATEGORY</Link>
                <div className="animation"></div>
              </li> : null

            }
            {this.state.auth ?

              <li onClick={this.selectClicked.bind(this)} className="checkAuth">
                <Link to="/profile/subscribers" >SUBSCRIBERS</Link>
                <div className="animation"></div>
              </li> : null
            }
            <li onClick={this.selectClicked.bind(this)}>
              <Link to="/articles">ARTICLES</Link>
              <div className="animation"></div>
            </li>

            <li onClick={this.selectClicked.bind(this)} >
              <Link to="/about">ABOUT ME</Link>
              <div className="animation"></div>
            </li>
            {this.state.auth ?

              <li onClick={this.selectClicked.bind(this)} className="checkAuth">
                <Link to="/" onClick={this.logout}>LOGOUT</Link>
                <div className="animation"></div>
              </li> : <li onClick={this.selectClicked.bind(this)}>
                <Link to="/login">LOGIN</Link>
                <div className="animation"></div>
              </li>
            }
            {!this.state.auth &&

              <li onClick={this.selectClicked.bind(this)} className="checkAuth">
                <Link to="/signup" >SIGNUP</Link>
                <div className="animation"></div>
              </li>
            }

            <li className="mode">
              <label htmlFor="checkbox" className="theme-switch">
                <input type="checkbox" id="checkbox" name="darkMode" checked={this.state.darkMode} onChange={this.onChange} />
                <div className="slider round"></div>
              </label>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Header;
