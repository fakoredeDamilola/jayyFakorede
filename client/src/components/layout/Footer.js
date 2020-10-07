import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.footerRef = React.createRef();
    this.footerLinks = React.createRef();
  }
  componentDidMount() {
    let links = this.footerLinks.current;
    let target = this.footerRef.current;

    window.onscroll = function (ev) {
      if (target.getBoundingClientRect().top + 70 <= window.innerHeight) {
        links.classList.add("footer-links-two");
        links.style.position = "absolute";
      } else {
        links.classList.remove("footer-links-two");
        links.style.position = "fixed                             ";
      }
    };
  }
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  render() {
    //let target = ;

    return (
      <div>
        <div className="footer" ref={this.footerRef}>
          <div className="footer-links" ref={this.footerLinks}>
            <div className="footer-social-media">
              <div className="footer-social-media-links">
                <a href="https://www.facebook.com" target="_blank">
                  FACEBOOK
                </a>
              </div>
              <div className="footer-social-media-links">
                <a href="https://www.twitter.com" target="_blank">
                  TWITTER
                </a>
              </div>
            </div>
            <div className="footer-information">
              <div className="footer-information-links">
                <span onClick={this.scrollToTop} style={{ cursor: "pointer" }}>
                  SUBSCRIBE
                </span>
              </div>
              <div className="footer-information-links">
                <Link to="/">
                  <span
                    onClick={this.scrollToTop}
                    style={{ cursor: "pointer" }}
                  >
                    GO TO TOP ⟶
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="copyright-link">
              COPYRIGHT 2019{" "}
              <span style={{ color: "rgb(94, 119, 226)" }}>
                JAYYFAKOREDE.COM
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
