import { handleRefreshToken } from '@/http/modules/login';
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
      const response = await handleRefreshToken();
      if(response.code !== 200){
        throw new Error(response?.message || '刷新 token 失败');
      }
    }catch(error){
      console.error('刷新 token 失败:', error);
      throw error;
    }
  })().finally(() => {
    refreshTokenPromise = null;
  });

  return refreshTokenPromise;
}
