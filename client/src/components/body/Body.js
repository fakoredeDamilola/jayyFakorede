import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import img5 from "../../img-5.jpg";
import pattern from "../../pattern-quotes.svg";
import CategoriesGrid from "../layout/CategoriesGrid";
import { getCategories, addSubscribers } from "../../actions/ArticlesAction"
import { connect } from "react-redux";
import PropTypes from "prop-types";
class Body extends Component {
  state = {
    ctaInput: "",
    token: ""
  };
  componentDidMount() {
    this.props.getCategories()
    let token;
    if (localStorage.getItem("token") === null) {
      token = null
      this.setState({ token })
    } else {
      let val = JSON.parse(localStorage.getItem("token"))
      token = val[0].token
      this.setState({ token })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  subscribe = (e) => {
    if (this.state.ctaInput !== "") {
      let subscribeInfo = {
        email: this.state.ctaInput,
      };
      this.props.addSubscribers(subscribeInfo, this.state.token)
      alert("thank you!! Expect my message shortly");
      this.setState({ ctaInput: "" })
    } else {
      alert("I need your email");
    }
  };
  render() {

    const { categories } = this.props

    return (
      <div className="body" style={{ zIndex: "5" }}>
        <section>
          <div
            className="section-1"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: "right bottom",
              backgroundSize: "cover",
            }}
          >
            <div className="section-1-inner">
              <div className="section-1-h3">
                <h3>THE DISCIPLINED APPROACH</h3>
              </div>
              <div className="section-1-h1">
                <h1>
                  A better way exists.
                  <br />
                  Find meaning and purpose in
                  <br />
                  what you market.
                </h1>
              </div>
              <div className="section-1-input-container">
                <div>
                  <div className="section-1-input">
                    <input
                      type="email"
                      name="ctaInput"
                      onChange={this.onChange}
                      value={this.state.ctaInput}
                      id=""
                      className="cta-input"
                      placeholder="EMAIL ADDRESS"
                    />
                  </div>
                  <div className="section-1-submit">
                    <input
                      type="submit"
                      value="JOIN"
                      onClick={this.subscribe}
                    />
                  </div>
                </div>

                <div className="section-1-text">
                  <p>ENTER YOUR EMAIL AND JOIN THE ADVENTURE</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="section-2">
            <div className="section-2-grid">
              {categories
                ? categories.filter(home => home.publish === true)
                  .map((category) => {
                    return (
                      <CategoriesGrid key={category._id} category={category} />
                    );
                  })
                : null}
            </div>
          </div>
        </section>
        <section>
          <div className="section-3">
            <div className="section-3-container">
              <div className="section-3-top">
                <div className="section-3-top-image-container">
                  <img
                    src={`${img5}`}
                    alt="People touching"
                    className="section-3-top-image"
                  />
                </div>
              </div>
              <div
                className="section-3-bottom"
                style={{
                  backgroundImage: `  linear-gradient(
                    to bottom right,
                    rgba(219, 217, 217, 0.034),
                    rgba(165, 162, 162, 0.14)
                  ), url(${pattern}) `,
                }}
              >
                <div className="section-3-bottom-text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt maiores maxime distinctio deleniti. Dolorum amet
                  totam provident aliquid recusandae consequuntur vitae dolor,
                  ullam eaque ipsa, suscipit ad nulla quo nostrum.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.article.categories,
});
Body.propTypes = {
  categories: PropTypes.array,
};

export default connect(mapStateToProps, { getCategories, addSubscribers })(Body);
