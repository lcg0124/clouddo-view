/**
 * 菜单相关的api
 * @author bootdo 1992lcg@163.com
 */
import * as API from './'

export default {

  menus: params=>{
    return API.GET('/api-admin/menu',params)
  },
  editMenu: params=>{
    return API.PUT('/api-admin/menu',params)
  },
  menuIdsByRoleId: params=>{
    return API.GET('/api-admin/menu/roleId',params)
  },
  add: params=>{
    return API.POST('/api-admin/menu',params)
  },
  remove: params=>{
    return API.DELETE('/api-admin/menu',params)
  }
}
