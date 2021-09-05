import { ServerError } from '../error/server-error'
import { HttpResponse } from '../protocols/https'

export const badRequest = (error: Error): HttpResponse => ({ statusCode: 400, body: error })
export const serverError = (error?: Error): HttpResponse => ({ statusCode: 500, body: new ServerError(error?.message as string) })
export const ok = <T>(data: T): HttpResponse => ({ statusCode: 200, body: data })
