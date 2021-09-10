import { Validation } from '../../../protocols/validation'
import { makeRequiredField } from '../default/required-field'
import { ValidationComposite } from '../../validators/validation-composite'

export const makeCreateFaturaValidators = (): Validation => {
  const validators = [
    makeRequiredField('id_processo')
  ]
  return new ValidationComposite(validators)
}
