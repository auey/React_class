import axios from 'axios'
import { error } from 'util';

const axiosInstance = axios.create({
  baseURL: 'https://test-deploy-node-app.herokuapp.com/',
  headers: { 'Content-Type': 'application/json' }
})

export const login = (username, password) => {  //function login
  const data = { 
    username: username,
    password: password
  }

  return axiosInstance.post('login', data)
    .then(data => data)
    .catch(error => error.response)
}

export const publishPost = (title, content) => {
  const data = { 
    title: title,
    content: content,
    user: { username: localStorage.getItem('username')}
  }

  return axiosInstance.post('api/post/create/', data) //ส่ง request post เข้าไป
    .then(data => data) //data เป็น  username and password ()
    .catch(error => error.response)
}

export const getAllPosts = () => {
  return axiosInstance.get('/api/post/all/')
    .then(response => response.data)
    .catch(error => { throw(error.response) })
}
