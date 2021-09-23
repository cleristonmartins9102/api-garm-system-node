import { DefaultRecords } from '../../models/default-records'

export interface PessoaModel extends DefaultRecords{
  id_individuo: number
  id_endereco: number
  identificador: number
  nome: string
  tipo: string
  apelido: string
}
