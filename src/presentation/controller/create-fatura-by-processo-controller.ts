import { CreateFatura } from '../../../domain/fatura/CreateFatura'
import { FaturaModel } from '../../../domain/fatura/models/fatura-model'
import { MissingParamError } from '../error/missing-param-error'
import { badRequest, ok, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest, HttpResponse } from '../protocols/https'

export class CreateFaturaByProcessoController implements Controller {
  private readonly creator: CreateFatura
  constructor (creator: CreateFatura) {
    this.creator = creator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['id_processo']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (typeof httpRequest.body.id_processo !== 'number') {
        return badRequest(new Error('id_processo must be a number'))
      }

      const response: FaturaModel = this.creator.create(httpRequest.body.id_processo)
      return ok(response)
    } catch (err) {
      return serverError(err)
    }
  }
}
