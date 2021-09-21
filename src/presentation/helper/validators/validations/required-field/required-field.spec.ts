import { MissingParamError } from '../../../../error/missing-param-error'
import { IsOfType } from '../is-object-type/is-of-type'
import { RequiredField } from './required-field'

const makeBodyFake = (): any => (
  {
    email: 'any_email'
  }
)

describe('Required Field', () => {
  test('Should ensure validator IsObjectType call with correct value', () => {
    const isOfType = new IsOfType('object')
    const isOfTypeSpy = jest.spyOn(isOfType, 'validate')
    const sut = new RequiredField('email', [isOfType])
    sut.validate(makeBodyFake())
    expect(isOfTypeSpy).toBeCalledWith(makeBodyFake())
  })

  test('Should ensure RequiredField returns error', () => {
    const sut = new RequiredField('name')
    const error = sut.validate(makeBodyFake())
    expect(error).toEqual(new MissingParamError('name'))
  })

  test('Should ensure RequiredField returns null on success', () => {
    const isOfType = new IsOfType('object')
    const sut = new RequiredField('email', [isOfType])
    const error = sut.validate(makeBodyFake())
    expect(error).toBeNull()
  })
})
