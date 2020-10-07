import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownView from "react-showdown";
import { getArticle, deleteArticle } from "../../actions/ArticlesAction"
class Article extends Component {
  componentDidMount() {
    let { slug, id } = this.props.match.params
    this.props.getArticle(slug);
    if (localStorage.getItem("token") === null) {
      this.setState({ auth: false, token: null })
    } else {
      let auth = JSON.parse(localStorage.getItem("token"))
      let token = auth[0].token
      this.setState({ auth: auth[1].logged, token })
    }
    this.setState({ slug, id })

  }
  state = {
    id: "",
    slug: "",
    article: [],
    auth: false
  };

  editArticle = () => {
    // this.props.previewArticle(this.state.article[0]);

    this.props.history.push(
      `/profile/article/edit/${this.props.article.name}/${this.props.match.params.id}`
    );

  };
  deleteArticle = () => {
    if (window.confirm("Do you want to delete this article")) {
      this.props.deleteArticle(this.state.slug, this.state.token)
      this.props.history.push(
        `/articles/${this.state.id}`
      );
    }
  };
  render() {
    const { article } = this.props;
    return article ? (
      <div className="articlePage" style={{ wordWrap: "break-word" }}>
        <div className="editBtn" style={{ display: this.state.auth ? "flex" : "none" }}>
          <div className="add_article">
            <button className="add_article_button" onClick={this.editArticle}>
              edit article
            </button>
          </div>
          <div className="add_article">
            <button className="add_article_button" onClick={this.deleteArticle} style={{ backgroundColor: "rgb(200, 19, 19)" }}>
              delete article
            </button>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h1><b>{article.name}</b></h1>
          <div className="articleInfo">
            <div>{article.author}</div>
            <div>{article.date}</div>
          </div>
          <div style={{ padding: "50px 20px", backgroundColor: "white", width: "100%" }} className="markdownContainer">
            <MarkdownView
              markdown={article.content}
              options={{ tables: true, emoji: true, parseImgDimensions: true }}
              className="markdown" />
          </div>
        </div>
      </div>
    ) : (
        <div></div>
      );
  }
}
// const mapDispatchtoProps = (dispatch) => ({
//   previewArticle: (article) =>
//     dispatch({ type: PREVIEW_ARTICLE, payload: article }),
//   getArticle: () =>
//     dispatch({
//       type: GET_ARTICLE,
//     }),
// });
const mapStateToProps = (state) => ({
  article: state.article.article,
});
export default connect(mapStateToProps, { getArticle, deleteArticle })(Article);
