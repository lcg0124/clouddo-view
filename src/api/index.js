/**
 * Created by bootdo.
 */
import Env from './env';
import axios from 'axios'
import {
  bus
} from '../bus.js'

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头


//添加一个请求拦截器
axios.interceptors.request.use(
  config => {
    if (window.localStorage.getItem('access-token')) {
      config.headers.Authorization = window.localStorage.getItem('access-token');
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 401) {
      //未登录
      bus.$emit('goto', '/login')
    }
  }

  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;


//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
