import type {
  HttpInstance,
  HttpInternalRequestConfig,
  HttpRequestConfig,
  HttpResponse,
  responseData,
} from '@/types/http';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import {
  DEDUPE_CONTROLLER_PROP,
  DEDUPE_KEY_PROP,
  getRequestKey,
  dedupeFn,
  requestMap,
  refreshToken,
} from '@/utils/http';

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 15000,
  withCredentials: true,
}) as unknown as HttpInstance;

http.interceptors.request.use((config: HttpInternalRequestConfig)=>{
  config.headers = config.headers ?? {};
  
  if(config.headers['Content-Type'] === undefined){
    if (config.data instanceof FormData) {
      // 浏览器会自动设置正确的Content-Type和boundary，无需手动设置
    }
    else if (config.data instanceof Blob) {
      config.headers['Content-Type'] = 'application/octet-stream';
    }
    else {
      config.headers['Content-Type'] = 'application/json';
    }
  }

  // 实现请求去重逻辑
  if(config?.meta?.deduplication){
    dedupeFn(config);
  }

  return config;
})

const onResponseFulfilled = async (response: HttpResponse): Promise<responseData> => {
    const {config,data} = response;

    // 请求去重：成功响应回来后删除请求标识
    if(config?.meta?.deduplication){
      const requestKey = (config as any)[DEDUPE_KEY_PROP] ?? getRequestKey(config);
      const controller = (config as any)[DEDUPE_CONTROLLER_PROP] as AbortController | undefined;
      if (controller && requestMap.get(requestKey) === controller) {
        requestMap.delete(requestKey);
      }
    }

    // 跳过 401 刷新 token 逻辑
    if(data.code === 401 && config.meta?.skipAuthRefresh){
      window.location.href = '/login';
      return Promise.reject(new Error('未授权，请重新登录'));
    }

    if(data.code === 401){
      await refreshToken();
      config.meta = {
        ...config.meta,
        skipAuthRefresh: true, // 避免刷新后code又是401导致死循环
      }
      return http(config);
    }

    if(config.meta?.tip){
      if(data.code !== 200){
        // 错误提示
        ElMessage.warning(data?.message || '请求失败');
        return Promise.reject(new Error(data?.message || '请求失败'));
      }
    }

    return response.data;
};

const onResponseRejected = (error: any) => {
  // abort请求进入onResponseRejected，删除请求标识
  if (error?.config?.meta?.deduplication) {
    const config = error.config as HttpInternalRequestConfig;
    const requestKey = (config as any)[DEDUPE_KEY_PROP] ?? getRequestKey(config);
    const controller = (config as any)[DEDUPE_CONTROLLER_PROP] as AbortController | undefined;
    if (controller && requestMap.get(requestKey) === controller) {
      requestMap.delete(requestKey);
    }
  }
  return Promise.reject(error);
};

// axios 的类型定义要求 response 拦截器必须返回 AxiosResponse；
// 但这里我们选择把响应“解包”为业务数据 response.data。
// 因此在注册拦截器时做一次类型适配。
http.interceptors.response.use(
  onResponseFulfilled as unknown as (value: any) => any,
  onResponseRejected
);

export function Get(url: string, config?: HttpRequestConfig): Promise<responseData> {
  // get请求默认去重
  const finalConfig = {
    ...config,
    meta: {
      deduplication: true,
      ...config?.meta,
    },
  }
  return http.get(url, finalConfig);
}

export function Post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<responseData<T>> {
  return http.post(url, data, config);
}

export function Delete(url: string, config?: HttpRequestConfig): Promise<responseData> {
  return http.delete(url, config);
}

export function Put(url: string, data?: any, config?: HttpRequestConfig): Promise<responseData> {
  return http.put(url, data, config);
}

export default http;