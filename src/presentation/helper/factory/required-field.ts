import { RequiredField } from '../validators/validations/required-field/required-field'
import { IsObjectType } from '../validators/validations/is-object-type/is-object-type'

export const makeRequiredField: Function = (fieldName: string): RequiredField => {
  const isObjectType = new IsObjectType()
  return new RequiredField(fieldName, [isObjectType])
}
