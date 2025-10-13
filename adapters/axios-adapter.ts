import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { HttpClient, HttpErrorResponse } from '@/shared/interfaces/http-client'

export type AxiosErrorMap<T extends string = string> = AxiosError<Array<HttpErrorResponse<T>>>

export class AxiosAdapter implements HttpClient {
  constructor(protected api: AxiosInstance) {}

  async get<T, R = AxiosResponse<T>, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.api.get(url, config)
  }

  async post<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.api.post(url, data, config)
  }

  async delete<T, R = AxiosResponse<T>, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.api.delete(url, config)
  }

  async put<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.api.put(url, data, config)
  }

  async patch<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.api.patch(url, data, config)
  }
}
