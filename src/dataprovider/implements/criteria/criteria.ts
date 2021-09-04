import { ICriteria } from '../../protocol/criteria'
import { Expression } from '../expression'
import { LogicalEnum } from '../logical-enum'

export class Criteria extends Expression {
  protected fullExpression: string = ''
  protected expressions: Expression[] = []
  protected logical: LogicalEnum[] = []
  add (expression: Expression, logical: LogicalEnum = LogicalEnum.AND): void {
    this.logical.push(logical)
    this.expressions.push(expression)
  }

  dump (): string {
    let expressionDumped: string = ''
    const expressionLen = this.expressions.length
    if (expressionLen === 0) return new Error('No expression').message
    this.expressions.forEach((expression: Expression, k: number) => {
      expressionDumped = `${expression.dump()}`
      if (k > 0) {
        const operator = this.logical[k]
        expressionDumped = `${operator} ${expressionDumped}`
      }
      this.fullExpression = `${this.fullExpression} ${expressionDumped}`
    })
    this.fullExpression = `(${this.fullExpression})`
    return this.fullExpression
  }
}
