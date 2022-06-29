import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { getStorage } from './storage'
import { message } from 'antd'
import history from '@/utils/history'

const errorMessage = (text: string, duration: number = 5) => {
  message.error(text, duration)
}

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  timeout: 30000,
  baseURL: 'https://adminapi.tobtt.cn', // api的base_url
  responseType: 'json',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (getStorage('token')) {
      config.headers!.Authorization = `Bearer ` + getStorage('token') || ''
    }
    // 下载文件时设置 responseType='blob';
    // if (config.$config?.file) {
    //   config.responseType = 'blob';
    // }

    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 200) {
      switch (res.code) {
        case 401:
          // ElMessageBox.confirm(
          //   '你已被登出，可以取消继续留在该页面，或者重新登录',
          //   '确定登出',
          //   {
          //     confirmButtonText: '重新登录',
          //     cancelButtonText: '取消',
          //     type: 'warning',
          //   }
          // ).then(() => {
          //   router.replace({
          //     // 跳转到登录页面
          //     path: '/login',
          //     query: { redirect: router.currentRoute.value.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
          //   });
          // });
          history.push('/login')
          break
        case 403:
          errorMessage('对不起，您暂无权限执行该操作')
          break
        default:
          errorMessage(res.message)
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return res.data
    }
  },
  (error: AxiosError) => {
    errorMessage('内部服务器错误')
    return Promise.reject(error)
  }
)

export default service
