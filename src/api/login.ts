import request from '@/utils/request'

// 登录
export const login = (data: object) =>
  request({
    url: '/auth/login',
    method: 'post',
    data
  })

// 返回当前用户登录信息
export const userInfo = () =>
  request({
    url: '/auth',
    method: 'get'
  })

// 退出登录
export const loginOut = () =>
  request({
    url: '/auth/loginOut',
    method: 'get'
  })
