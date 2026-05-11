import { Get, Post } from "..";

// 登录接口
export const login = (data: any) => {
  return Post('/user/login', data, { meta: { tip: true } });
}

// 获取用户信息
export const getUserInfo = () => {
  return Get('/user/profile');
}

// 刷新access token
export const handleRefreshToken = () => {
  return Post('/user/refreshToken', undefined, { meta: { skipAuthRefresh: true } });
}