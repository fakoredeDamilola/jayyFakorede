import React, { Component } from "react";
import Topics from "./Topics";
import { connect } from "react-redux";
import { getArticles, getCategory, deleteCategory } from "../../actions/ArticlesAction";
import PropTypes from "prop-types";
class Category_layout extends Component {
  state = {
    auth: false,
    token: ""
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getArticles(id);
    this.props.getCategory(id);
    if (localStorage.getItem("token") === null) {
      this.setState({ auth: false, token: "" })
    } else {
      let token
      let auth = JSON.parse(localStorage.getItem("token"))
      token = auth[0].token
      this.setState({ auth: auth[1].logged, token })
    }

  }
  state = {
    article: [],
    articles: [],
    auth: false,
    token: ""
  };
  addArticle = () => {
    this.props.history.push(
      `/profile/article/add/${this.props.category[0].name}/${this.props.match.params.id}`
    );
  };
  deleteCategory = () => {
    if (window.prompt("Type the name of the article you want to delete. Note that every article under this category will be deleted") === this.props.category[0].name) {
      this.props.deleteCategory(this.props.match.params.id, this.state.token)
      this.props.history.push(
        "/"
      );
    } else {
      alert("wrong information")
    }
  };
  render() {
    let { articles, category } = this.props;
    return (
      <div>
        <div className="category-container">
          <div className="editBtn" style={{ display: this.state.auth ? "flex" : "none" }}>
            <div className="add_article">
              <button className="add_article_button" onClick={this.addArticle}>
                add article
              </button>
            </div>
            <div className="add_article">
              <button
                className="add_article_button"
                onClick={this.deleteCategory}
                style={{ backgroundColor: "rgb(200, 19, 19)" }}
              >
                Delete Category
              </button>
            </div>
          </div>

          <div className="category-name">
            <div
              className="about-info"
              style={{ wordWrap: "break-word", textAlign: "center" }}
            >
              {
                category[0] ?
                  (
                    <div>
                      <h1><b>{category[0].name}</b></h1>
                      <h4>Number : <b>{category[0].number}</b></h4>
                    </div>

                  ) : null
              }


            </div>
            <div className="articles_container">


              <div className="topics">
                {articles
                  .filter((draft) => draft.draft === false)
                  .map((article) => {
                    return (
                      <Topics
                        key={article._id}
                        value={article}
                        id={this.props.match.params.id}
                      />
                    );
                  })
                }
              </div>
              <div className="draftContainer" style={{ display: this.state.auth ? "block" : "none" }}>
                <div className="type_name">
                  <h2><b>Drafts</b> </h2>
                </div>
                <div className="topics">
                  {articles[0] ? (articles
                    .filter((draft) => draft.draft === true)
                    .map((article) => {
                      return (
                        <Topics
                          key={article._id}
                          value={article}
                          id={this.props.match.params.id}
                        />
                      );
                    })) : null}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  articles: state.article.articles,
  category: state.article.category
});
Category_layout.propTypes = {
  articles: PropTypes.array
}
export default connect(mapStateToProps, { getArticles, getCategory, deleteCategory })(Category_layout);
