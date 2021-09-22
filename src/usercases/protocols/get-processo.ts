import { ProcessModel } from '../../../domain/processo/model/process'

export interface GetProcesso {
  get (id: number): Promise<ProcessModel>
}
