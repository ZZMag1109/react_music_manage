import { Route } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
axios.defaults.timeout = 5000;     
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = "http://localhost:8888";

//请求拦截器 让post请求的请求格式为urlencode格式
axios.interceptors.request.use(
    function (config) { 
        const { method, data } = config;
        //处理post请求，将data对象转换成query参数格式字符串
        if (method.toLowerCase() === "post" && typeof data === "object") {
            config.data = qs.stringify(data);
        }
        return config;
     }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    Route.history.replace('/');
                    break;
                case 404:
                    break
            }
            return Promise.reject(error.response)
        }
    }
);

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data) 
            .then(response => {
            resolve(response.data)
            })
            .catch(err => {
            reject(err)
        })
    })
}