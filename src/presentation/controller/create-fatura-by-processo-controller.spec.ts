import { MissingParamError } from '../error/missing-param-error'
import { ServerError } from '../error/server-error'
import { badRequest, ok, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest } from '../protocols/https'
import { CreateFaturaByProcessoController } from './create-fatura-by-processo-controller'
import { CreateFatura } from '../../../domain/fatura/CreateFatura'
import { FaturaModel } from '../../../domain/fatura/models/fatura-model'
import { RequiredField } from '../helper/validators/validations/required-field/required-field'
import { ValidationComposite } from '../helper/validators/validation-composite'
import { Validation } from '../protocols/validation'

type CreateFaturaRequestType = {
  id_processo?: number
}

type SutTypes = {
  sut: Controller
  facadeStub: CreateFatura
}

const makeValidation = (field: string): any => {
  const validation = new RequiredField(field)
  return validation
}

const makeValidator = (validation: Validation[]): Validation => {
  const validator = new ValidationComposite(validation)
  return validator
}

const validation = [
  makeValidation('id_processo')
]
const validator = makeValidator(validation)

const makeSut = (): any => {
  const facadeStub = makeFakeFacade()
  const sut = new CreateFaturaByProcessoController(facadeStub, validator)
  return {
    sut,
    facadeStub
  }
}

const makeFakeFacade = (): any => {
  class FacadeCreateFaturaStub implements CreateFatura {
    create (): FaturaModel {
      return {
        id_fatura: 1,
        numero: 2
      }
    }
  }
  return new FacadeCreateFaturaStub()
}

describe('Test Create Fatura', () => {
  // test('Should ensure return 400 if id_processo is not provided', () => {
  //   const { sut } = makeSut()
  //   const httpRequest: HttpRequest = {
  //     body: {
  //     }
  //   }
  //   const response = sut.handle(httpRequest)
  //   expect(response).toEqual(badRequest(new MissingParamError('id_processo')))
  // })

  // test('Should ensure return 400 if param id_processo is not a number', () => {
  //   const { sut } = makeSut()
  //   const httpRequest: HttpRequest = {
  //     body: {
  //       id_processo: ('any_value' as any)
  //     }
  //   }
  //   const response = sut.handle(httpRequest)
  //   expect(response).toEqual(badRequest(new Error('id_processo must be a number')))
  // })

  test('Should ensure return 500 if FacadeFatura throw', () => {
    const { sut, facadeStub } = makeSut()
    const error = new Error('facade_error')
    const httpRequest: HttpRequest = {
      body: {
        id_processo: 1
      }
    }
    jest.spyOn(facadeStub, 'create').mockImplementationOnce(() => {
      throw error
    })
    const response = sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  test('Should ensure return 500 if FacadeFatura throw', () => {
    const { sut, facadeStub } = makeSut()
    const error = new Error('facade_error')
    const httpRequest: HttpRequest = {
      body: {
        id_processo: 1
      }
    }
    jest.spyOn(facadeStub, 'create').mockImplementationOnce(() => {
      throw error
    })
    const response = sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })
})
