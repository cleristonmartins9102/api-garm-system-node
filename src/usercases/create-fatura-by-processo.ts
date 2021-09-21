import { badRequest, serverError } from '../presentation/helper/http-helper'
import { Controller } from '../presentation/protocols/contoller'
import { HttpRequest, HttpResponse } from '../presentation/protocols/https'
import { Validation } from '../presentation/protocols/validation'
import { GetProcesso } from './protocols/get-processo'

export class CreatorFaturaByProcesso implements Controller {
  private readonly validator: Validation
  private readonly getProcess: GetProcesso

  constructor (validator: Validation, getProcess: GetProcesso) {
    this.validator = validator
    this.getProcess = getProcess
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      return { statusCode: 1, body: 'dsds' }
    } catch (err) {
      return serverError(err)
    }
  }
}
