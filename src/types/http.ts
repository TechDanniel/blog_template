import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface HttpMeta {
  deduplication?: boolean; // 是否启用请求去重
  tip?: boolean; // 是否显示提示信息
  skipAuthRefresh?: boolean; // 是否跳过 401 刷新 token 逻辑（某些接口可能不需要认证）
}

// 业务侧传入的 config（axios 公共类型）
export type HttpRequestConfig<D = any> = AxiosRequestConfig<D> & {
  meta?: HttpMeta;
};

// 拦截器里拿到的 config（axios 内部类型）
export type HttpInternalRequestConfig<D = any> = InternalAxiosRequestConfig<D> & {
  meta?: HttpMeta;
};

export interface responseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface HttpResponse<T = any> extends AxiosResponse<responseData<T>>{
  config: HttpInternalRequestConfig;
}

// 注意：axios 的类型不会自动因为拦截器“解包 response.data”而改变。
// 所以我们显式声明一个实例类型：让 get/post 等方法返回业务 responseData。
export type HttpInstance = Omit<
  AxiosInstance,
  | "request"
  | "get"
  | "delete"
  | "head"
  | "options"
  | "post"
  | "put"
  | "patch"
> & {
  <T = any, D = any>(config: HttpRequestConfig<D>): Promise<responseData<T>>;
  request<T = any, D = any>(config: HttpRequestConfig<D>): Promise<responseData<T>>;
  get<T = any, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  delete<T = any, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  head<T = any, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  options<T = any, D = any>(url: string, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  post<T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  put<T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
  patch<T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<responseData<T>>;
};