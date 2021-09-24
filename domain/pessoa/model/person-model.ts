import { DefaultRecords } from '../../models/default-records'

export interface PersonModel extends DefaultRecords{
  id_individuo: number
  id_endereco: number
  identificador: number
  nome: string
  tipo: string
  apelido: string
}
