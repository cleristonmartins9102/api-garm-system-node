import { Expression } from '../implements/expression'

export interface ICriteria{
  add (expression: Expression): void
}
