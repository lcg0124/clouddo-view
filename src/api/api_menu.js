/**
 * 菜单相关的api
 * @author bootdo 1992lcg@163.com
 */
import * as API from './'

export default {

  menus: params=>{
    return API.GET('/admin/api/menu',params)
  },
  editMenu: params=>{
    return API.PUT('/admin/api/menu',params)
  },
  menuIdsByRoleId: params=>{
    return API.GET('/admin/api/menu/roleId',params)
  }
}
