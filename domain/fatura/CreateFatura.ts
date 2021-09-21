import { FaturaModel } from './models/fatura-model'

export interface CreateFatura {
  create (number: number): Promise<FaturaModel>
}
