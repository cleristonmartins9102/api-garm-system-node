import { Controller } from '../presentation/protocols/contoller'
import { HttpRequest, HttpResponse } from '../presentation/protocols/https'

export class CreatorFaturaByProcesso implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    return { statusCode: 1, body: 2 }
  }
}
