import { DefaultRecords } from '../../models/default-records'

export interface ProposalModel extends DefaultRecords {
  id_cliente: number
  id_vendedor: number
  id_qualificacao: number
  id_coadjuvante: number
  id_doc_proposta?: null
  id_aceite?: number
  id_contato?: number
  id_regime: number
  id_regimeclassificacao?: number
  num?: number
  numero: number
  tipo?: string
  dta_emissao: string
  dta_validade: string
  prazo_pagamento: number
  status: number
  classificacao: string
  dta_aceite?: string
}
