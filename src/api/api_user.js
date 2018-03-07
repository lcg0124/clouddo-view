/**
 * Created by bootdo.
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/admin/api/login', params)
  },
  //登出
  logout: params => {
    return API.GET('/api/v1/users/logout', params)
  },
  tokenUser: params =>{
    return API.GET('/admin/api/user/currentUser',params)
  },
  //修改个人信息
  changeProfile: params => {
    return API.PATCH('/api/v1/users/profile', params)
  },

  //查询获取user列表(通过page分页)
  findList: params => {
    return API.GET('/admin/api/user', params)
  },

  //增加用户
  addUser:params =>{
    return API.POST('/admin/api/user',params)
  },
  //修改用户
  editUser:params =>{
    return API.PUT('/admin/api/user',params)
  },
  //删除用户
  removeUser:params =>{
    return API.DELETE('/admin/api/user',params)
  }
}
