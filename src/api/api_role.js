/**
 * Created by bootdo.
 * 角色相关api
 */
import * as API from './'

export default {

  //查询获取role列表(通过page分页)
  findList: params => {
    return API.GET('/admin/api/role', params)
  },

  //查询获取一条role信息
  findById: id => {
    return API.GET('/admin/api/role/userId/'+id)
  },

  add: params => {
    return API.POST(`/admin/api/role`, params)
  },
  update: (id, params) => {
    return API.PUT('/admin/api/role', params)
  },

  //单个删除role
  remove: id => {
    return API.DELETE(`/api/v1/roles/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/roles/batch/${ids}`)
  }

}
