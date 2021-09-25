import { CaptureModel, PersonModel, ProcessModel, ProposalModel } from '../../../domain/models'
import { AddInvoiceCaptureModel } from '../../dataprovider/invoice/models'
import { dateNow } from '../utils'

const makeFakeAddInvoice = (): AddInvoiceCaptureModel => ({
  id_faturamodelo: 2,
  id_faturastatus: 1,
  id_processo: 1,
  id_cliente: makeFakeProposal().id_cliente,
  id_agentecarga: makeFakeCapture().id_agentecarga,
  valor: 100,
  valor_custo: 33,
  valor_lucro: 10,
  valor_imposto_interno: 20,
  dta_emissao: dateNow,
  dta_vencimento: '21-12-2021',
  nf: 3333
})

const makeFakeCapture = (): CaptureModel => (
  {
    id_captacao: 2,
    id_proposta: 333,
    id_agentecarga: 441
  }
)

const makeFakePerson = (): PersonModel => ({
  id_individuo: 2222,
  id_endereco: 33444,
  identificador: 2222,
  apelido: 'any_nickname',
  nome: 'any_nome',
  tipo: 'any_type'
})

const makeFakeProposal = (): ProposalModel => ({
  id_cliente: 2222,
  id_coadjuvante: 22222,
  id_qualificacao: 4444,
  id_regime: 3333,
  id_vendedor: 545555,
  numero: 10,
  dta_emissao: '29/12/2020',
  dta_validade: '30/01/2021',
  prazo_pagamento: 20,
  status: 3,
  classificacao: 'modelo'
})

const makeFakeProcess = (): ProcessModel => ({
  id_processo: 1,
  id_captacao: 2
})

export const fakeModel = {
  makeFakeProcess,
  makeFakeProposal,
  makeFakePerson,
  makeFakeCapture,
  makeFakeAddInvoice
}
