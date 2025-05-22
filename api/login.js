// api/index.js
import request from '@/utils/request';

// 登录API
export const login = (data) => {
  return request.post('/api/wechat-login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/info');
};

// 其他API...  