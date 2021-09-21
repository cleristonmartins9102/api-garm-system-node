import { RequiredField } from '../../validators/validations/required-field/required-field'
import { IsOfType } from '../../validators/validations/is-object-type/is-of-type'

export const makeRequiredField: Function = (fieldName: string): RequiredField => {
  const isOfType = new IsOfType('object')
  return new RequiredField(fieldName, [isOfType])
}
