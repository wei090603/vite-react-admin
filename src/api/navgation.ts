import request from '@/utils/request'

// 登录
export const navgationList = (params: object) =>
  request({
    url: '/menu',
    method: 'get',
    params
  })
