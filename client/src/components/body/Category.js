import React, { Component } from "react";
import CategoriesGrid from "../layout/CategoriesGrid";
import { connect } from "react-redux";
import { getCategories } from "../../actions/ArticlesAction"
import { Link } from "react-router-dom";
class Category extends Component {
  componentDidMount() {
    this.props.getCategories();
    if (localStorage.getItem("token") === null) {
      this.setState({ auth: false })
    } else {
      let auth = JSON.parse(localStorage.getItem("token"))
      this.setState({ auth: auth[1].logged })
    }
  }
  state = {
    articlesInput: "",
    articlesList: [],
    auth: false
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  searchArticle = (e) => {
    let searchArticle = this.props.categories.filter((art) => {
      art.name.toLowerCase().includes(this.state.articlesInput.toLowerCase())
    });
    this.setState({ articles: searchArticle });
    // if (articlesInput !== null)
    //   articlesList = this.props.articles.filter(
    //     (article) => article.name === articlesInput
    //   );
  };
  render() {
    const { categories } = this.props;
    return (
      <div>
        <div className="articles" style={{ background: "white" }}>
          <section className="articles_search">
            <div className="articles_search_div">
              <p>ARTICLES</p>
              <div className="add_article" style={{ display: this.state.auth ? "block" : "none" }}>
                <button
                  className="add_article_button"
                  onClick={this.addArticle}
                >
                  <Link to="/profile/addCategory">Add Category</Link>
                </button>
              </div>
              {/* <div className="articles_input">
                <input
                  type="text"
                  name="articlesInput"
                  value={this.state.articlesInput}
                  onChange={this.onChange}
                  className="articles_input_text"
                  placeholder="search"
                  tabIndex="-1"
                />

                <button onClick={this.searchArticle}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            */}
            </div>
          </section>
          <section className="articles_section">
            {categories
              ? categories.map((category) => {
                return (
                  <CategoriesGrid key={category._id} category={category} />
                );
              })
              : null}
          </section>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  categories: state.article.categories,
});
export default connect(mapStateToProps, { getCategories })(Category);
