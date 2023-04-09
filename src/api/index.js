import { post } from './request';

//判断管理员是否登陆成功
export const getLoginStatus = (param) => post(`admin/login/status`, param);