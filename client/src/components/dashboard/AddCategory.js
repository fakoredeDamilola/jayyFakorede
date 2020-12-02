import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import { connect } from "react-redux"
import { addCategory } from "../../actions/ArticlesAction"
import Spinner from "../layout/Spinner"
class Add_category extends Component {
  state = {
    name: "",
    img: "",
    imageAsFile: {},
    previewImage: "",
    publish: "",
    number: 0,
    errors: [],
    loading: false
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clicked = (e) => {
    e.preventDefault();
    document.getElementsByClassName("input")[0].click();
  };
  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    this.setState({ imageAsFile: image });
  };
  submit = (e) => {
    if (this.state.errors.length === 0) {
      let category = {
        name: this.state.name,
        previewImage: this.state.imageAsFile,
        publish: this.state.publish === "True" ? true : false,
        aos: "fade-down",
        number: this.state.number,
      }
      if (category.name === "" || category.previewImage.name === undefined || category.publish === "") {
        alert("please fill all necessary info")
      } else {
        let token;
        if (localStorage.getItem("token") === null) {
          token = null
        } else {
          let val = JSON.parse(localStorage.getItem("token"))
          token = val[0].token
        }
        this.setState({ loading: true })
        this.props.addCategory(category, token)
          .then(res => {
            if (res === "Category added") {
              this.setState({ loading: false })
              this.props.history.push('/')
            } else {
              alert("session expired, please login again")
              this.props.history.push('/login')
            }
          })
        this.setState({
          name: "",
          img: "",
          imageAsFile: {},
          previewImage: "",
          publish: "",
          number: 0,
          errors: []
        })

      }

    }
  };

  render() {

    return !this.state.loading ?
      (
        <div
          style={{
            backgroundImage: `url(${img1})`,
            backgroundPosition: "left",
            backgroundSize: "cover",
            height: "800px",
          }}
        >
          <div className="login-body">
            <div>
              <div className="login-header">
                <div>
                  <span>J A Y Y</span> <span>F A K O R E D E</span>
                </div>
                <div style={{ marginTop: "15px", fontSize: "26px" }}>
                  ADD CATEGORY
              </div>
              </div>
              <div className="login-center">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="field">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    className="input"
                    onChange={this.handleImageAsFile}
                  />
                  <label
                    htmlFor="file"
                    className="profileLabel"
                    onClick={this.clicked} style={{ marginTop: "-5px" }}
                  >
                    <i className="fas fa-plus"></i> Add Image
                </label>
                </div>
                <div>
                  <label htmlFor="publish" style={{ fontSize: "20px" }}>
                    Add to home screen
                </label>
                  <div className="radioContainer">
                    <div className="input-group">
                      <span>
                        <input
                          type="radio"
                          name="publish"
                          value="True"
                          onChange={this.onChange}
                        />
                      </span><label htmlFor="True">True</label>
                    </div>
                    <div className="input-group">
                      <span>
                        <input
                          type="radio"
                          name="publish"
                          value="false"
                          onChange={this.onChange}
                        />
                      </span>

                      <label htmlFor="False">False</label>
                    </div>
                  </div>{" "}
                </div>
                <div className="progressbar"></div>
                <div className="submitBox">
                  <div className="submit">
                    <input
                      type="submit"
                      value="Submit"
                      className="submitBtn"
                      onClick={this.submit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (<div>
        <Spinner value="Creating a new category..." />
      </div>)



  }
}
const mapStateToProps = (state) => ({
  message: state.article.message
})
export default connect(mapStateToProps, { addCategory })(Add_category);
