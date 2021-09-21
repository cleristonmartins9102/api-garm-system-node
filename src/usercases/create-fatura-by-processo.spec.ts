import { CreatorFaturaByProcesso } from './create-fatura-by-processo'
import { ValidationComposite } from '../presentation/helper/validators/validation-composite'
import { RequiredField } from '../presentation/helper/validators/validations/required-field/required-field'
import { HttpRequest } from '../presentation/protocols/https'
import { InvalidParamError } from '../../../../../Courses/node/src/presentation/erros/invalid-param-error'
import { badRequest, serverError } from '../presentation/helper/http-helper'
import { Controller } from '../presentation/protocols/contoller'
import { Validation } from '../presentation/protocols/validation'
import { GetProcesso } from './protocols/get-processo'
import { ProcessoModel } from '../../domain/processo/model/processo'

type SutTypes = {
  sut: Controller
  validation: Validation
}

const makeValidation = (field: string): any => {
  const validation = new RequiredField(field)
  return validation
}

const makeValidator = (validation: Validation[]): Validation => {
  const validator = new ValidationComposite(validation)
  return validator
}

const makeFakeProcesso = (): ProcessoModel => ({
  id_processo: 33
})

const makeGetProcessoStub = (): GetProcesso => {
  class GetProcessoStub implements GetProcesso {
    async get (id: number): Promise<ProcessoModel> {
      return Promise.resolve(makeFakeProcesso())
    }
  }
  return new GetProcessoStub()
}

const makeSut = (): SutTypes => {
  const validation = [
    makeValidation('id_processo')
  ]
  const validator = makeValidator(validation)
  const getProcesso = makeGetProcessoStub()
  const sut = new CreatorFaturaByProcesso(validator, getProcesso)
  return {
    sut,
    validation: validation[0]
  }
}

describe('Create Fatura By Processo', () => {
  test('Should ensure CreatorFaturaByProcesso returns error if Validator returns error', () => {
    const { sut, validation } = makeSut()
    const fakeData = { id_captacao: 2 }
    const httpRequest: HttpRequest = {
      body: fakeData
    }
    jest.spyOn(validation, 'validate').mockReturnValueOnce(new InvalidParamError('id_processo'))
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
})
