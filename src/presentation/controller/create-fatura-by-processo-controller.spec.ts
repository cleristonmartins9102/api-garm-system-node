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
import { InvalidParamError } from '../../../../../../Courses/node/src/presentation/erros/invalid-param-error'

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
  test('Should ensure CreatorFaturaByProcesso 400 error if Validator returns error', () => {
    const { sut, validation } = makeSut()
    const fakeData = { id_processo: 2 }
    const httpRequest: HttpRequest = {
      body: fakeData
    }
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      return new InvalidParamError('id_processo')
    })
    expect(sut.handle(httpRequest)).toEqual(badRequest(new InvalidParamError('id_processo')))
  })

  test('Should ensure CreatorFaturaByProcesso returns 400 if Validator throws', () => {
    const { sut, validation } = makeSut()
    const fakeData = { id_processo: 2 }
    const httpRequest: HttpRequest = {
      body: fakeData
    }
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.handle(httpRequest)).toEqual(serverError())
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
