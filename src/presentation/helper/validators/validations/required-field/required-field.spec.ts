import { MissingParamError } from '../../../../error/missing-param-error'
import { IsObjectType } from '../is-object-type/is-object-type'
import { RequiredField } from './required-field'

const makeBodyFake = (): any => (
  {
    email: 'any_email'
  }
)

describe('Required Field', () => {
  test('Should ensure validator IsObjectType call with correct value', () => {
    const isObjectType = new IsObjectType()
    const isObjectTypeSpy = jest.spyOn(isObjectType, 'validate')
    const sut = new RequiredField('email', [isObjectType])
    sut.validate(makeBodyFake())
    expect(isObjectTypeSpy).toBeCalledWith(makeBodyFake())
  })
})
