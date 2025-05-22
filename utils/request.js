// utils/request.js

import env from '../config/env.js';

console.log(env)

const config = {
  baseURL: env.API_BASE_URL,
  timeout: 10000
};
class Request {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }
  
  request(options) {
    const { url, method = 'GET', data = {}, header = {} } = options;
    
    // 添加token
    const token = uni.getStorageSync('token');
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    
    // 拼接完整URL
    const fullURL = this.baseURL + url;
    
    return new Promise((resolve, reject) => {
      uni.request({
        url: fullURL,
        method,
        data,
        header,
        timeout: this.timeout,
        success: (res) => {
          // 这里可以根据后端返回的状态码做统一处理
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            this.handleError(res);
            reject(res);
          }
        },
        fail: (err) => {
          this.handleNetworkError(err);
          reject(err);
        }
      });
    });
  }
  
  // 处理业务错误
  handleError(res) {
    const { statusCode, data } = res;
    
    switch (statusCode) {
      case 401:
        uni.showToast({
          title: '未授权，请重新登录',
          icon: 'none'
        });
        // 跳转到登录页
        uni.navigateTo({
          url: '/pages/login/login'
        });
        break;
      case 403:
        uni.showToast({
          title: '权限不足',
          icon: 'none'
        });
        break;
      case 404:
        uni.showToast({
          title: '请求资源不存在',
          icon: 'none'
        });
        break;
      default:
        uni.showToast({
          title: data.msg || `请求错误 ${statusCode}`,
          icon: 'none'
        });
    }
  }
  
  // 处理网络错误
  handleNetworkError(err) {
    console.error('网络错误:', err);
    uni.showToast({
      title: '网络连接失败，请检查网络设置',
      icon: 'none'
    });
  }
  
  // 封装常用请求方法
  get(url, params = {}) {
    return this.request({ url, method: 'GET', data: params });
  }
  
  post(url, data = {}) {
    return this.request({ url, method: 'POST', data });
  }
  
  put(url, data = {}) {
    return this.request({ url, method: 'PUT', data });
  }
  
  delete(url, data = {}) {
    return this.request({ url, method: 'DELETE', data });
  }
}

// 创建请求实例
const request = new Request(config);

export default request;  