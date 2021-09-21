import { InvalidTypeError } from '../../../../error/invalid-type'
import { IsOfType } from './is-of-type'

describe('IsObjectType Validator', () => {
  test('Should ensure return error if is invalid value', () => {
    const dataFake = 'any_data'
    const sut = new IsOfType('object')
    const error = sut.validate(dataFake)
    expect(error).toEqual(new InvalidTypeError())
  })

  test('Should ensure returns null if is a valid value', () => {
    const dataFake = { key: 'any_value' }
    const sut = new IsOfType('object')
    const error = sut.validate(dataFake)
    expect(error).toBeNull()
  })
})
