import { MissingParamError } from '../error/missing-param-error'
import { ServerError } from '../error/server-error'
import { badRequest, serverError } from '../helper/http-helper'
import { Controller } from '../protocols/contoller'
import { HttpRequest } from '../protocols/https'
import { CreateFaturaController } from './create-fatura'
import { CreateFatura } from '../../../domain/fatura/CreateFatura'

type CreateFaturaRequestType = {
  id_processo?: number
}

type SutTypes = {
  sut: Controller
  facadeStub: CreateFatura
}

const makeSut = (): any => {
  const facadeStub = makeFakeFacade()
  const sut = new CreateFaturaController(facadeStub)
  return {
    sut,
    facadeStub
  }
}

const makeFakeFacade = (): any => {
  class FacadeCreateFaturaStub implements CreateFatura {
    create (): any {
      throw new Error()
    }
  }
  return new FacadeCreateFaturaStub()
}

describe('Test Create Fatura', () => {
  test('Should ensure return 400 if id_processo is not provided', () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
      }
    }
    const response = sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new MissingParamError('id_processo')))
  })

  test('Should ensure return 500 if FacadeFatura returns error', () => {
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
