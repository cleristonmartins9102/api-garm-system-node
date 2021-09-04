import { HttpRequest, HttpResponse } from './https'

export interface Controller<T> {
  handle (httpRequest: HttpRequest<T>): HttpResponse
}
