import { ValidationComposite } from '../../validators/validation-composite'
import { makeRequiredField } from '../default/required-field'
import { makeCreateFaturaValidators } from './create-fatura-composite-validator'

jest.mock('../../validators/validation-composite')

describe('Create Fatura Composite Validator', () => {
  test('Should call ValidatorComposite with correct value', () => {
    const validators = [
      makeRequiredField('id_processo')
    ]
    makeCreateFaturaValidators()
    expect(ValidationComposite).toBeCalledWith(validators)
  })
})
