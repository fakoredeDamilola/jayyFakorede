import React from "react";
import "./App.css";

import { Provider } from "react-redux";

import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/body/Body";
import About from "./components/body/About";
import Category from "./components/body/Category";
import AddArticle from "./components/dashboard/AddArticle";
import AddCategory from "./components/dashboard/AddCategory";
import Article from "./components/body/Article";
import CategoryLayout from "./components/layout/CategoryLayout";
import Login from "./components/dashboard/Login";
import Subscribers from "./components/dashboard/Subscribers";
import Signup from "./components/dashboard/Signup";
import PreviewArticle from "./components/dashboard/PreviewArticle";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <div className="box">
            <Header />

            <div className="wrapper">
              <Switch>
                {" "}
                <Route component={Body} path="/" exact />
                <Route component={About} path="/about" exact />
                <Route exact component={Category} path="/articles" />
                <Route component={CategoryLayout} path="/articles/:id" exact />
                <Route component={Login} path="/login" exact />
                <Route
                  component={PreviewArticle}
                  path="/profile/preview/:name/:id"
                  exact
                />
                <Route
                  component={AddArticle}
                  path="/profile/article/:value/:name/:id"
                  exact
                />
                <Route
                  component={Subscribers}
                  path="/profile/subscribers"
                  exact
                />
                <Route
                  component={AddCategory}
                  path="/profile/addCategory"
                  exact
                />
                <Route component={Article} path="/article/:id/:slug" exact />
                <Route component={Article} path="/article/:id/:slug" exact />
                <Route component={Signup} path="/signup" exact />
              </Switch>
            </div>

            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
