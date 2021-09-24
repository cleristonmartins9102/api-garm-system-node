import { PessoaModel } from './model/pessoa-mode'

export interface GetPerson<T = any> {
  get (value: T): Promise<PessoaModel>
}
