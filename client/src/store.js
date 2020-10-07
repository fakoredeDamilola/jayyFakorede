import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import ArticleReducer from "./reducers/ArticleReducer";

const middlewares = [thunk]
const rootReducer = combineReducers({
  article: ArticleReducer,
});
//use firebase storage
const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

export { store };
