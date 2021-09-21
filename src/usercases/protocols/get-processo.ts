import { ProcessoModel } from '../../../domain/processo/model/processo'

export interface GetProcesso {
  get (id: number): Promise<ProcessoModel>
}
