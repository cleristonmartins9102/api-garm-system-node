import { InvalidTypeError } from '../../../../error/invalid-type'
import { Validation } from '../../../../protocols/validation'

export class IsObjectType implements Validation<{}> {
  validate (input: {}): Error | null {
    if (typeof input !== 'object') return new InvalidTypeError()
    return null
  }
}
