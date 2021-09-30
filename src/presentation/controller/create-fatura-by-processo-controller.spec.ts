import { badRequest, ok, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest } from '../protocols/https'
import { CreateFaturaByProcessoController } from './create-fatura-by-processo-controller'
import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { RequiredField } from '../helper/validators/validations/required-field/required-field'
import { ValidationComposite } from '../helper/validators/validation-composite'
import { Validation } from '../protocols/validation'
import { InvalidParamError } from '../../../../../../Courses/node/src/presentation/erros/invalid-param-error'
import { fakeModel } from '../test/make-model'

type SutTypes = {
  sut: Controller
  facadeStub: CreateInvoice
}

const makeValidation = (field: string): any => {
  const validation = new RequiredField(field)
  return validation
}

const makeValidator = (validation: Validation[]): Validation => {
  const validator = new ValidationComposite(validation)
  return validator
}

const makeSut = (): any => {
  const validation = [
    makeValidation('id_processo')
  ]
  const validator = makeValidator(validation)
  const facadeStub = makeFakeFacade()
  const sut = new CreateFaturaByProcessoController(facadeStub, validator)
  return {
    sut,
    facadeStub,
    validation: validation[0]
  }
}

const makeFakeFacade = (): any => {
  class FacadeCreateFaturaStub implements CreateInvoice {
    async create (): Promise<InvoiceModel> {
      return fakeModel.makeFakeInvoice()
    }
  }
  return new FacadeCreateFaturaStub()
}

const makeFakeHttpRequest = (): HttpRequest => (
  {
    body: {
      id_processo: 1
    }
  }
)

describe('Test Create Fatura', () => {
  test('Should ensure CreatorFaturaByProcesso 400 error if Validator returns error', async () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      return new InvalidParamError('id_processo')
    })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(badRequest(new InvalidParamError('id_processo')))
  })

  test('Should ensure CreatorFaturaByProcesso returns 400 if Validator throws', async () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(serverError())
  })

  test('Should ensure return 500 if FacadeFatura throw', async () => {
    const { sut, facadeStub } = makeSut()
    const error = new Error('facade_error')
    jest.spyOn(facadeStub, 'create').mockImplementationOnce(() => {
      throw error
    })
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(serverError(error))
  })

  test('Should ensure return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeHttpRequest())
    expect(response).toEqual(ok(fakeModel.makeFakeInvoice()))
  })
})
