import { Route } from 'react-router-dom';
import qs from 'qs';
import { message } from 'antd'
import axios from 'axios';

// 创建一个axios实例，配置axios的基本配置项
const request = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 5000,
    withCredentials: true
})
//请求拦截器 让post请求的请求格式为urlencode格式
// 1、统一处理了请求参数格式转换
request.interceptors.request.use(
    function (config) {
        const { method, data } = config;
        //处理post请求，将data对象转换成query参数格式字符串
        // 待处理：下一步需要扩展后台的参数格式
        if (method.toLowerCase() === "post" && typeof data === "object") {
            config.data = qs.stringify(data);
        }
        return config;
    }
)

//响应拦截器
// 1、统一处理接口请求出错和业务处理出错的情况
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data && response.data.code === 0) {
                message.error(response.data.msg);
                // 返回一个pending状态的peomise,终端promise链
                return new Promise(() => { });
            }
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
            message.error(error.message);
            // 返回一个pending状态的peomise,终端promise链
            return new Promise(() => { });
        }
    }
);

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        request.get(url, { params: params })
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
        request.post(url, data)
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}