import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validators: Validation[]

  constructor (validators: Validation[]) {
    this.validators = validators
  }

  validate (input: any): Error | null {
    for (const validate of this.validators) {
      const error = validate.validate(input)
    }
    return null
  }
}
