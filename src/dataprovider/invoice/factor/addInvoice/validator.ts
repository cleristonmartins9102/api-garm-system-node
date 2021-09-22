import { ValidationComposite } from '../../../../presentation/helper/validators/validation-composite'
import { RequiredField } from '../../../../presentation/helper/validators/validations/required-field/required-field'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeValidator = (): Validation => {
  const validations = [
    new RequiredField('id_faturamodelo'),
    new RequiredField('id_faturastatus'),
    new RequiredField('id_processo'),
    new RequiredField('id_cliente'),
    new RequiredField('id_agentecarga'),
    new RequiredField('valor'),
    new RequiredField('valor_custo'),
    new RequiredField('valor_lucro'),
    new RequiredField('valor_imposto_interno'),
    new RequiredField('dta_emissao'),
    new RequiredField('dta_vencimento')
  ]
  return new ValidationComposite(validations)
}
