import { PessoaModel } from './model/pessoa-mode'

export interface GetPessoa<T = any> {
  get (value: T): Promise<PessoaModel>
}
