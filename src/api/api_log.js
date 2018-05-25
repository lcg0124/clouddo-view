import * as API from './'

export default {
  list: params => {
    return API.GET('/api-base/log', params)
  },
  remove: params => {
    return API.DELETE('/api-base/log', params)
  }
}
