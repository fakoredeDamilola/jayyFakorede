import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    auth: false
  }
  UNSAFE_componentWillMount() {
    document.addEventListener("mousedown", this.showNav, false);
    if (localStorage.getItem("token") === null) {
      this.setState({ auth: false })
    } else {
      let auth = JSON.parse(localStorage.getItem("token"))
      this.setState({ auth: auth[1].logged })

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
  onLoginoutClick = (e) => {
    e.preventDefault();
  };
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
              </li> : <li className="diversion">
                <div>diversion</div>

              </li>

            }
            <li onClick={this.selectClicked.bind(this)}>
              <Link to="/articles">ARTICLES</Link>
              <div className="animation"></div>
            </li>

            <li onClick={this.selectClicked.bind(this)} >
              <Link to="/about">ABOUT ME</Link>
              <div className="animation"></div>
            </li>
            <li onClick={this.selectClicked.bind(this)}>
              <Link to="/login">LOGIN</Link>
              <div className="animation"></div>
            </li>
            {this.state.auth ?

              <li onClick={this.selectClicked.bind(this)} className="checkAuth">
                <Link to="/profile/subscribers" >SUBSCRIBERS</Link>
                <div className="animation"></div>
              </li> : <li className="diversion">
                <div>diversion</div>

              </li>
            }

          </ul>
        </nav>
      </div>
    );
  }
}
export default Header;
