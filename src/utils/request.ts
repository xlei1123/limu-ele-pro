import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const sm4KeyMap = new Map();
// 创建 axios 实例
const service = axios.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error("Expected 'config' and 'config.headers' not to be undefined");
    }
    if (config.responseType == 'blob') {
      console.log('🚀 ~ file: request.ts:29 ~ config.responseType:', config.responseType);
      config.timeout = 600000;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应数据为二进制流处理(Excel导出)
    if (response.config && response.config.headers && response.config.headers.encryCode) {
      response.data = JSON.parse(response.data.data);
      console.log('🚀 ~ file: request.ts:86 ~ response:', response);
    }
    const { code, msg } = response.data;

    if (code === 0) {
      return response.data;
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response && error.response.data) {
      const { code, msg } = error.response.data;
    }

    return Promise.reject(error.response);
  }
);

// 导出 axios 实例
export default service;
