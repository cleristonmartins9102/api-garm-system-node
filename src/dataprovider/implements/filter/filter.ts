import { prepare } from '../../helper/prepare-value'
import { Expression } from '../expression'

export class Filter extends Expression {
  private readonly filter: string
  constructor (prop: string, operator: string, value: number | string) {
    super()
    const valuePrepared = prepare(value)
    this.filter = `${prop}${operator}${valuePrepared}`
  }

  dump (): string {
    return this.filter
  }
}
