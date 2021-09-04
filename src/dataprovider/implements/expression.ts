import { LogicalEnum } from './logical-enum'

export abstract class Expression {
  private readonly and: string = LogicalEnum.AND
  private readonly or: string = LogicalEnum.OR
  abstract dump (): string
}
