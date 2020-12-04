import {
  PREVIEW_ARTICLE,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  EDIT_ARTICLES,
  ADD_CATEGORY,
  GET_ARTICLE_TO_EDIT,
  ADD_SUBSCRIBERS,
  GET_SUBSCRIBERS,
  ADD_NUMBERS,
} from "./types";
import axios from 'axios'

export const previewArticle = (article) => {
  return {
    type: PREVIEW_ARTICLE,
    payload: article,
  };
};


// CATEGORIES


export const getCategories = () => async dispatch => {
  const res = await axios.get('/api/articlecategory')

  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  })

};
export const getCategory = (id) => async dispatch => {
  const res = await axios.get(`/api/articlecategory/category/${id}`)

  dispatch({
    type: GET_CATEGORY,
    payload: res.data
  })

};

export const addCategory = (category, token) => async dispatch => {
  let file = category.previewImage
  let data = new FormData()
  data.append('file', file)
  let imgConfig = {
    headers: { 'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
  }
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  let result = axios.post('/api/image/upload', data, imgConfig)
  let imageName = file.name.split(" ").join("%20")
  category.previewImage = `/api/image/file/${imageName}`
  const res = await axios.post('/api/articlecategory/add',
    category, authConfig)
  dispatch({
    type: ADD_CATEGORY,
    payload: res.data
  })
  return res.data
}

export const deleteCategory = (id, token) => async dispatch => {
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.delete(`/api/articlecategory/${id}`, authConfig)
}


//  ARTICLES


export const getArticles = (id) => async dispatch => {
  const res = await axios.get(`/api/article/articles/${id}`)

  dispatch({
    type: GET_ARTICLES,
    payload: res.data
  })
}
export const getArticle = (slug) => async dispatch => {
  const res = await axios.get(`/api/article/${slug}`)

  dispatch({
    type: GET_ARTICLE,
    payload: res.data[0]
  })
}


//add article
export const addArticle = (article, token) => async dispatch => {

  let file = article.previewImage
  let data = new FormData()
  data.append('file', file)
  let imgConfig = {
    headers: { 'content-type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
  }
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  axios.post('/api/image/upload', data, imgConfig)
  let imageName = file.name.split(" ").join("%20")
  article.previewImage = `/api/image/file/${imageName}`
  const res = await axios.post('/api/article/add',
    article, authConfig)
  dispatch({
    type: ADD_ARTICLE,
    payload: res.data
  })

  return res.data
}

export const deleteArticle = (id, token) => async dispatch => {
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.delete(`/api/article/${id}`, authConfig)
  dispatch({
    type: EDIT_ARTICLES,
    payload: res.data
  })
}
export const editArticle = (id, article, token) => async dispatch => {
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.post(`/api/article/update/${id}`,
    article, authConfig)
  return res.data
}
export const uploadArticleImage = (formData, config) => async dispatch => {
  axios.post('/api/upload/image', formData, config)
    .then((response) => {
      alert("The file is successfully uploaded")
    }).catch((error) => {
      alert(`${error} file was not uploaded, try again`)
    })
}

export const getArticleToEdit = () => {
  return {
    type: GET_ARTICLE_TO_EDIT,
  };
}

//SUBSCRIBERS

//add subscribers
//add article
export const addSubscribers = (subscribe, token) => async dispatch => {


  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.post('/api/subscribe/add',
    subscribe, authConfig)
  dispatch({
    type: ADD_SUBSCRIBERS,
    payload: res.data
  })
  return res.data

}
export const getSubscribers = (token) => async dispatch => {
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.get('/api/subscribe', authConfig)
  dispatch({
    type: GET_SUBSCRIBERS,
    payload: res.data
  })
}
export const addNumberOfArticles = (id, number, token) => async dispatch => {
  let authConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  console.log(id, number)
  const res = await axios.post(`/api/articleCategory/addNumber/${id}`, number, authConfig)
  dispatch({
    type: ADD_NUMBERS,
    payload: res.data
  })
}