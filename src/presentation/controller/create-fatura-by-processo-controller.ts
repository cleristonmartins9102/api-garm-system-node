import { CreateFatura } from '../../../domain/fatura/CreateFatura'
import { FaturaModel } from '../../../domain/fatura/models/fatura-model'
import { MissingParamError } from '../error/missing-param-error'
import { badRequest, ok, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest, HttpResponse } from '../protocols/https'
import { Validation } from '../protocols/validation'

export class CreateFaturaByProcessoController implements Controller {
  private readonly creator: CreateFatura
  private readonly validator: Validation

  constructor (creator: CreateFatura, validator: Validation) {
    this.creator = creator
    this.validator = validator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const response: FaturaModel = this.creator.create(httpRequest.body.id_processo)
      return ok(response)
    } catch (err) {
      return serverError(err)
    }
  }
}
