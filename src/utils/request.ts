import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 开发环境实际请求地址
// const ACTUAL_BASE_URL = 'http://localhost:8080'
// API 请求使用的相对路径
const API_BASE_URL = '/api'

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 显示实际请求地址（经过代理后的地址）
    // const actualUrl = `${ACTUAL_BASE_URL}${config.url}`
    // console.log('实际请求地址:', actualUrl)
    // console.log('代理请求地址:', `http://localhost:5173${config.url}`)
    // console.log('请求详情:', {
    //   method: config.method,
    //   proxyUrl: `http://localhost:5173${config.url}`,
    //   actualUrl: actualUrl,
    //   data: config.data,
    //   headers: config.headers
    // })
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('收到响应:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
      url: response.config.url
    })
    return response.data
  },
  (error) => {
    console.error('响应错误:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
      url: error.config?.url
    })
    
    // 统一错误处理
    const errorMessage = error.response?.data?.message || error.message || '请求失败'
    ElMessage.error(errorMessage)
    
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export const get = <T>(url: string, params?: any): Promise<T> => {
  return request.get(url, { params })
}

// 封装 POST 请求
export const post = <T>(url: string, data?: any): Promise<T> => {
  return request.post(url, data)
}

// 封装 PUT 请求
export const put = <T>(url: string, data?: any): Promise<T> => {
  return request.put(url, data)
}

// 封装 DELETE 请求
export const del = <T>(url: string, params?: any): Promise<T> => {
  return request.delete(url, { params })
}

// 封装文件上传请求
export const upload = <T>(url: string, formData: FormData): Promise<T> => {
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default request 