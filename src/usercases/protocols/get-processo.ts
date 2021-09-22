import { ProcessModel } from '../../../domain/processo/model/process'

export interface GetProcess {
  get (id: number): Promise<ProcessModel | null>
}
