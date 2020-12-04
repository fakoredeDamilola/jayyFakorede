import React, { Component } from "react";
import { getArticleToEdit } from "../../actions/ArticlesAction"
import { connect } from "react-redux";
import MarkdownView from "react-showdown";
import ReactMarkdown from "react-markdown";
class PreviewArticle extends Component {
  state = {
    article: "",
    categoryId: "",
    categoryName: "",
    edit: "",
    fullSize: false
  };

  componentDidMount() {
    this.props.getArticleToEdit();
    this.setState({
      categoryId: this.props.match.params.id,
      categoryName: this.props.match.params.name,
      article: this.props.previewArticle.content,
      edit: this.props.previewArticle.edit,
    });
  }
  edit = (e) => {
    this.props.history.push(
      `/profile/article/preview/${this.state.categoryName}/${this.state.categoryId}`
    );
  };
  handleClick = () => {
    console.log("handling click")
    this.setState({ fullSize: !this.state.fullSize })
  }

  render() {
    const MyImage = () => {

      return (
        <img
          className={this.state.fullSize ? "large" : "small"}
          alt={this.props.alt}
          src={this.props.src}
          onClick={this.handleClick}
        />
      )
    }
    const renderers = {
      image: MyImage
    }

    return (
      <div style={{ marginTop: "30px" }}>
        <div className="editBtn" style={{ marginBottom: "80px" }}>
          <div className="submit">
            <input
              type="submit"
              value="Edit"
              className="editButton"
              onClick={this.edit}
            />
          </div>
        </div>
        <div style={{ padding: "50px 20px", backgroundColor: "white", width: "100%" }} className="markdownContainer">
          {/* <MarkdownView
            markdown={this.state.article}
            options={{ tables: true, emoji: true, parseImgDimensions: true }}
            className="markdown" /> */}
          <ReactMarkdown source={this.state.article} renderers={renderers} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  previewArticle: state.article.previewArticle,
});
export default connect(mapStateToProps, { getArticleToEdit })(PreviewArticle);
