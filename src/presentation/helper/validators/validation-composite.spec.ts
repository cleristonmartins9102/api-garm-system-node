import { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../../../../../../Courses/node/src/presentation/erros/missing-param-error'

jest.mock('./validation-composite', () => {
  return {
    ValidationComposite: jest.fn().mockImplementation(() => {
      return {
        validate: function (input: string): Error {
          return makeFakeError('any_error')
        }
      }
    })
  }
})

type SutTypes = {
  sut: ValidationComposite
  validation: Validation
}

const makeFakeError = (msg?: string): Error => new Error(msg)

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeValidations = (): Validation[] => {
  return [
    makeValidationStub()
  ]
}

const makeFakeData = (): any => ({
  email: 'any_email@gmail.com'
}
)

const makeSut = (): SutTypes => {
  const validations = makeValidations()
  const validation = validations[0]
  const sut = new ValidationComposite(validations)
  return {
    sut,
    validation
  }
}

describe('Validator Composite', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Should ValidationComposite receives correct value', () => {
    const { sut } = makeSut()
    expect(ValidationComposite).toBeCalledWith(makeValidations())
  })

  // test('Should ensure ValidationComposite throws if Validations throw', () => {
  //   const { sut, validation } = makeSut()
  //   // jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
  //   //   throw makeFakeError()
  //   // })
  //   const resp = sut.validate(makeFakeData())
  //   expect(resp).toThrow()
  // })

  test('Should ensure ValidationComposite returns correct error', () => {
    const { sut } = makeSut()
    const sutResp = sut.validate(makeFakeData())
    expect(sutResp).toEqual(makeFakeError('any_error'))
  })
})
