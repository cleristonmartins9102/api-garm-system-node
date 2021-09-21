import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { badRequest, ok, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest, HttpResponse } from '../protocols/https'
import { Validation } from '../protocols/validation'

export class CreateFaturaByProcessoController implements Controller {
  private readonly creatorFatura: CreateInvoice
  private readonly validator: Validation

  constructor (creatorFatura: CreateInvoice, validator: Validation) {
    this.creatorFatura = creatorFatura
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const response: InvoiceModel = await this.creatorFatura.create(httpRequest.body.id_processo)
      return ok(response)
    } catch (err) {
      return serverError(err)
    }
  }
}
