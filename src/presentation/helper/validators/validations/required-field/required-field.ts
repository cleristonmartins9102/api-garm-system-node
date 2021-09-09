import { MissingParamError } from '../../../../error/missing-param-error'
import { Validation } from '../../../../protocols/validation'

export class RequiredField implements Validation<{}> {
  private readonly fieldName: string
  private readonly validators: Validation[]

  constructor (fieldName: string, validators: Validation[] = []) {
    this.fieldName = fieldName
    this.validators = validators
  }

  validate (input: {}): Error | null {
    for (const validator of this.validators) {
      const errorType = validator.validate(input)
      if (errorType) {
        return errorType
      }
    }

    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
    return null
  }
}
