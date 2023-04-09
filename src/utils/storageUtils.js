/**
 * 操作local数据的工具函数模块
 * 引用了marcuswestin/store.js库，比原生的兼容性较强
 */
import store, { set } from "store";
const USER_KEY = 'user_key';
export default {
  /**
   * 保存用户登录信息
   * @param {*} user 用户登录信息
   */
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user);
  },

  /**
   * 获取用户登录信息
   * @returns 
   */
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(USER_KEY) || {};
  },

  /**
   * 删除保存的用户登录信息
   */
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  }
}