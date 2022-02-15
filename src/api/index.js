import { get, post } from './ajax';

//判断管理员是否登陆成功
export const getLoginStatus = (param) => post(`admin/login/status`, param);