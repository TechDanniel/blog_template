import http from '@/http/index';
import type{ HttpInternalRequestConfig } from '@/types/http';
export const requestMap = new Map<string, AbortController>();

export const DEDUPE_KEY_PROP = '__dedupeKey';
export const DEDUPE_CONTROLLER_PROP = '__dedupeController';

// 生成请求唯一标识
export function getRequestKey(config:HttpInternalRequestConfig):string{
  const { method, url, params, data } = config;
  return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
}

// 请求去重函数
export function dedupeFn(config:HttpInternalRequestConfig){
  const requestKey = getRequestKey(config);
  const existing = requestMap.get(requestKey);
  existing?.abort();

  const controller = new AbortController();
  requestMap.set(requestKey, controller);

  (config as any)[DEDUPE_KEY_PROP] = requestKey;
  (config as any)[DEDUPE_CONTROLLER_PROP] = controller;
  config.signal = controller.signal;
}

let refreshTokenPromise: Promise<void> | null = null;
export async function refreshToken(){
  if(refreshTokenPromise){
    return refreshTokenPromise;
  }

  refreshTokenPromise = (async () => {
    try{
      const response = await http.post('/refresh-token', undefined, { meta: { skipAuthRefresh: true } });
      if(response.code !== 200){
        window.location.href = '/login';
        throw new Error(response?.message || '刷新 token 失败');
      }
    }catch(error){
      window.location.href = '/login';
      throw error;
    }
  })().finally(() => {
    refreshTokenPromise = null;
  });

  return refreshTokenPromise;
}
