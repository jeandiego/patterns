import type { HttpStatusCode } from 'axios'

export type IHttpResponse<T = unknown, D = unknown> = {
  data: T
  status: HttpStatusCode
  statusText: string
  headers: Record<string, string>
  config: D
}

type HttpMethod = <T = unknown, R = IHttpResponse<T>>(url: string, config?: Record<string, unknown>) => Promise<R>
type HttpMethodMutate = <T = unknown, R = IHttpResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: Record<string, unknown>,
) => Promise<R>

export interface HttpClient {
  get: HttpMethod
  post: HttpMethodMutate
  delete: HttpMethod
  put: HttpMethodMutate
  patch: HttpMethodMutate
}

export interface HttpErrorResponse<T extends string = string> {
  code: T
  message: string
}
