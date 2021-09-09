import { InvalidTypeError } from '../../../../error/invalid-type'
import { IsObjectType } from './is-object-type'

describe('IsObjectType Validator', () => {
  test('Should ensure return error if is invalid value', () => {
    const dataFake = 'any_data'
    const sut = new IsObjectType()
    const error = sut.validate(dataFake)
    expect(error).toEqual(new InvalidTypeError())
  })

  test('Should ensure return null if is valid value', () => {
    const dataFake = { key: 'any_value' }
    const sut = new IsObjectType()
    const error = sut.validate(dataFake)
    expect(error).toBeNull()
  })
})
