import React, { Component } from "react";
import img1 from "../../img-1.jpg";
import Instruction from "../layout/Instruction";
import Spinner from "../layout/Spinner";
import Popup from "../layout/Popup";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios"
import { getArticleToEdit, previewArticle, addArticle, editArticle, uploadArticleImage, addNumberOfArticles } from "../../actions/ArticlesAction"
class AddArticle extends Component {
  state = {
    name: "",
    imageAsFile: {},
    imgUrl: "",
    author: "",
    content: "",
    shortDescription: "",
    categoryId: "",
    categoryName: "",
    edit: "",
    previewImage: "",
    time: "",
    date: "",
    id: "",
    show: false,
    draft: "",
    multerImage: "",
    token: "",
    popup: false,
    loading: false,
    popupColor: "",
    popupData: ""
  };
  componentDidMount() {
    this.props.getArticleToEdit();

    if (this.props.match.params.value === "edit") {
      this.setState({
        content: this.props.articleEdit.article.content,
        name: this.props.articleEdit.article.name,
        author: this.props.articleEdit.article.author,
        shortDescription: this.props.articleEdit.article.shortDescription,
        previewImage: this.props.articleEdit.article.previewImage,
        id: this.props.articleEdit.article._id,
        categoryId: this.props.match.params.id,
        categoryName: this.props.match.params.name,
        edit: this.props.match.params.value,
        draft: this.props.articleEdit.article.draft
      });
    } else if (this.props.match.params.value === "preview") {
      this.setState({
        content: this.props.articleEdit.previewArticle.content,
        name: this.props.articleEdit.previewArticle.name,
        author: this.props.articleEdit.previewArticle.author,
        shortDescription: this.props.articleEdit.previewArticle.shortDescription,
        previewImage: this.props.articleEdit.previewArticle.previewImage,
        id: this.props.articleEdit.previewArticle.id,
        categoryId: this.props.match.params.id,
        categoryName: this.props.match.params.name,
        edit: this.props.articleEdit.previewArticle.edit,
        draft: this.props.articleEdit.previewArticle.draft
      });
    } else {
      this.setState({
        content: "",
        name: "",
        author: "",
        shortDescription: "",
        previewImage: "",
        id: "",
        draft: "",
        categoryId: this.props.match.params.id,
        categoryName: this.props.match.params.name,
        edit: this.props.match.params.value,
      });
    }
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
  clicked = (e) => {
    e.preventDefault();
    document.getElementsByClassName("input")[0].click();
  };
  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    this.setState({ imageAsFile: image });
  };
  preview = (e) => {
    let article = {
      content: this.state.content,
      name: this.state.name,
      author: this.state.author,
      shortDescription: this.state.shortDescription,
      previewImage: this.state.previewImage,
      edit: this.state.edit,
      id: this.state.id,
      draft: this.state.draft
    };
    this.props.previewArticle(article);
    this.props.history.push(
      `/profile/preview/${this.state.categoryName}/${this.state.categoryId}`
    );
  };
  submit = (e) => {
    if (this.state.edit === "edit") {
      let newArticle = {
        name: this.state.name,
        draft: false,
        content: this.state.content,
        author: this.state.author,
        categoryName: this.state.categoryName,
        categoryId: this.state.categoryId,
        shortDescription: this.state.shortDescription,
        previewImage: this.state.previewImage
      };
      this.setState({ loading: true })
      this.props.editArticle(this.state.id, newArticle, this.state.token)
        .then(res => {
          if (res === "article Updated") {
            this.setState({ loading: false })
            let id = this.state.categoryId
            this.setState({
              content: "",
              name: "",
              author: "",
              shortDescription: "",
              previewImage: "",
              id: "",
              draft: "",
              categoryId: "",
              categoryName: "",
              edit: "",
            });
            this.props.history.push(
              `/articles/${id}`
            );
          }
        })

    } else if (this.state.edit === "add") {
      let newArticle = {
        name: this.state.name,
        draft: false,
        content: this.state.content,
        author: this.state.author,
        categoryName: this.state.categoryName,
        categoryId: this.state.categoryId,
        shortDescription: this.state.shortDescription,
        previewImage: this.state.imageAsFile
      };
      if (newArticle.name === "" || newArticle.previewImage.name === undefined || newArticle.shortDescription === "" || newArticle.content === "" || newArticle.author === "") {
        this.setState({
          popup: true,
          popupData: "please fill all necessary info, especially the short description and image for that",
          popupColor: "danger",
        })
      } else {
        this.setState({ loading: true })
        this.props.addArticle(newArticle, this.state.token)
          .then(res => {
            if (res === "article added") {
              this.setState({ loading: false })
              let id = this.state.categoryId
              this.setState({
                content: "",
                name: "",
                author: "",
                shortDescription: "",
                previewImage: "",
                id: "",
                draft: "",
                categoryId: "",
                categoryName: "",
                edit: "",
              });
              this.props.history.push(
                `/articles/${id}`
              );
            }
          })

      }

    }

  };
  saveDraft = (e) => {
    if (this.state.edit === "edit") {
      this.setState({ loading: true })
      let draftArticle = {
        name: this.state.name,
        draft: true,
        content: this.state.content,
        author: this.state.author,
        categoryName: this.state.categoryName,
        categoryId: this.state.categoryId,
        shortDescription: this.state.shortDescription,
        previewImage: this.state.previewImage,
      };
      this.props.editArticle(this.state.id, draftArticle, this.state.token)
        .then(res => {
          this.setState({ loading: false })
          if (res === "article Updated") {
            let id = this.state.categoryId
            this.setState({
              content: "",
              name: "",
              author: "",
              shortDescription: "",
              previewImage: "",
              id: "",
              draft: "",
              categoryId: "",
              categoryName: "",
              edit: "",
            });
            this.props.history.push(
              `/articles/${id}`
            );
          }
        })

    } else if (this.state.edit === "add") {
      let draftArticle = {
        name: this.state.name,
        draft: true,
        content: this.state.content,
        author: this.state.author,
        categoryName: this.state.categoryName,
        categoryId: this.state.categoryId,
        shortDescription: this.state.shortDescription,
        previewImage: this.state.imageAsFile,
      };
      if (draftArticle.name === "" || draftArticle.previewImage.name === undefined || draftArticle.shortDescription === "" || draftArticle.content === "" || draftArticle.author === "") {
        this.setState({
          popup: true,
          popupData: "please fill all necessary info, especially the short description and image for that",
          popupColor: "danger",
        })
      } else {
        this.setState({ loading: true })
        this.props.addArticle(draftArticle, this.state.token)
          .then(res => {
            this.setState({ loading: false })
            if (res === "article added") {

              let id = this.state.categoryId
              this.setState({
                content: "",
                name: "",
                author: "",
                shortDescription: "",
                previewImage: "",
                id: "",
                draft: "",
                categoryId: "",
                categoryName: "",
                edit: "",
              });
              this.props.history.push(
                `/articles/${id}`
              );
            }
          })

      }

    }


  };
  submitImage = (e) => {
    e.preventDefault()

    const config = {
      headers: { 'content-type': 'multipart/form-data', 'Authorization': `Bearer ${this.state.token}` }
    }
    console.log(this.state.imageAsFile.name)
    if (this.state.imageAsFile.name !== undefined) {
      let file = this.state.imageAsFile
      let data = new FormData()
      data.append('file', file)
      axios.post('/api/image/upload', data, config)
        .then(data => {
          if (data.data.message === "uploaded") {
            this.setState({
              popup: true,
              popupData: "Image uploaded",
              popupColor: "info",
            })
          } else {
            this.setState({
              popup: true,
              popupData: "Session ended",
              popupColor: "danger",
            })
            this.props.history.push("/login");
          }
        })
      let imageName = file.name.split(" ").join("%20")
      this.setState({ imgUrl: `/api/image/file/${imageName}` })
    } else {
      this.setState({
        popup: true,
        popupData: "No image was selected",
        popupColor: "danger",
      })
    }

  };
  closeAlert = () => {
    this.setState({ popup: false })
  }
  copyText = (e) => {
    let input = e.target.previousElementSibling;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
  showInstructions = () => {
    this.setState({ show: true });
  };
  removeInstruction = () => {
    this.setState({ show: false });
  };
  render() {
    return !this.state.loading ?
      (
        <div
          style={{
            backgroundImage: `url(${img1})`,
            backgroundPosition: "left",
            backgroundSize: "cover",
            paddingBottom: "100px",
          }}
        >
          <div className="article-body">
            <div>
              <div className="login-header">
                <div>
                  <span>J A Y Y</span> <span>F A K O R E D E</span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <h3>{this.state.categoryName}</h3>
                </div>
                <h6 style={{ marginTop: "15px", color: "rgba(0, 0, 0, 0.563)" }}>
                  ADD ARTICLE
              </h6>
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
                  <label htmlFor="author">Author</label>
                  <input
                    type="author"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>
                <div className="field upload">
                  <form encType="multipart/form-data" onSubmit={this.submitImage} id="imageForm">
                    <label className="mb-5">
                      Upload Image{" "}
                      <h6>
                        The image you upload here will be used inside your articles
                  </h6>
                    </label>
                    <input
                      type="file"
                      name="file" id="file"
                      accept="image/*"
                      className="input"
                      onChange={this.handleImageAsFile}
                    />
                    <label
                      htmlFor="file"
                      className="profileLabel"
                      onClick={this.clicked}
                    >
                      <i className="fas fa-plus"></i> Add Image
                </label>
                    <input type="submit" className="submit_image" value="submit" />
                  </form>
                  {
                    this.state.popup &&
                    <Popup
                      color={this.state.popupColor} data={this.state.popupData}
                      closeAlert={this.closeAlert}
                    />
                  }
                </div>
                <div className="link_picture_article">
                  <h4 style={{ paddingBottom: "10px" }}>
                    Links for image uploaded
                </h4>
                  <div className="imgField">
                    <input
                      type="text"
                      name="img1_value"
                      className="linkForImage"
                      value={this.state.imgUrl}
                      onChange={() => {
                        return null;
                      }}
                    />

                    <button className="copy_image" onClick={this.copyText}>
                      copy
                  </button>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="article">Article</label>

                  <textarea
                    name="content"
                    cols="30"
                    rows="50"
                    style={{ width: "100%", marginTop: "10px" }}
                    value={this.state.content}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <div className="editBtn">
                  <div className="submit">
                    <input
                      type="submit"
                      value="Preview"
                      className="editButton"
                      onClick={this.preview}
                    />
                  </div>
                  <div className="submit">
                    <input
                      type="submit"
                      value="About Markdown"
                      className="editButton"
                      onClick={this.showInstructions}
                    />
                  </div>
                </div>
                {this.state.show ? (
                  <div
                    className="instruction_button"
                    onClick={this.removeInstruction}
                  >
                    X
                  </div>
                ) : null}

                {this.state.show ? <Instruction /> : null}
                <div>

                  <div>
                    <div className="field">
                      <label>
                        Upload Image{" "}
                        <h6 style={{ marginBottom: "20px" }}>
                          this image is used for preview, with the short
                          description
                        </h6>
                      </label>
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
                        onClick={this.clicked}
                      >
                        <i className="fas fa-plus"></i> Add Image
                      </label>
                    </div>

                    <div className="field">
                      <label htmlFor=" short description">
                        Short description
                      </label>
                      <textarea
                        name="shortDescription"
                        cols="30"
                        rows="10"
                        style={{ width: "100%", marginTop: "10px" }}
                        value={this.state.shortDescription}
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </div>

                </div>
                <div className="submitBox mb-2">
                  <div className="submit">
                    <input
                      type="submit"
                      value="Publish"
                      className="submitBtn"
                      onClick={this.submit}
                    />
                  </div>
                  <div className="submit">
                    <input
                      type="submit"
                      value="Save draft"
                      className="submitBtn"
                      onClick={this.saveDraft} style={{ background: "orange" }}
                    />
                  </div>
                </div>
                {
                  this.state.popup &&
                  <Popup
                    color={this.state.popupColor} data={this.state.popupData}
                    closeAlert={this.closeAlert}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      ) : (<div>
        <Spinner value="creating article" />
      </div>)





  }
}

const mapStateToProps = (state) => ({
  articleEdit: state.article,
})
export default compose(
  connect(
    mapStateToProps,
    { getArticleToEdit, previewArticle, addArticle, editArticle, uploadArticleImage, addNumberOfArticles }
  )
)(AddArticle);
