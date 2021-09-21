import { InvalidTypeError } from '../../../../error/invalid-type'
import { Validation } from '../../../../protocols/validation'

export class IsOfType implements Validation<{}> {
  private readonly type: string

  constructor (type: string) {
    this.type = type
  }

  validate (input: any): Error | null {
    switch (typeof input) {
      case this.type:
        return null
      default:
        return new InvalidTypeError()
    }
  }
}
