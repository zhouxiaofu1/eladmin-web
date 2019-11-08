import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tProjectDetail',
    method: 'post',
    data
  })
}

export function del(projectId) {
  return request({
    url: 'api/tProjectDetail/' + projectId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/tProjectDetail',
    method: 'put',
    data
  })
}

export function downloadTProjectDetail(params) {
  return request({
    url: 'api/tProjectDetail/download',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
