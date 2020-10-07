import {
  PREVIEW_ARTICLE,
  GET_ARTICLE_TO_EDIT,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  ADD_CATEGORY,
  GET_SUBSCRIBERS
} from "../actions/types";

const initalState = {
  previewArticle: {},
  categories: [],
  category: [],
  articles: [],
  article: [],
  subscribers: [],
  message: ""
};
export default function (state = initalState, action) {
  switch (action.type) {
    case PREVIEW_ARTICLE:
      return {
        ...state,
        previewArticle: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload
      }
    case GET_ARTICLE_TO_EDIT:
      return {
        ...state,
      }
    case ADD_CATEGORY:
      return {
        ...state,
        message: action.payload
      }
    case ADD_ARTICLE:
      return {
        ...state,
        message: action.payload
      }
    case GET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload
      }
    default:
      return state;
  }
}
