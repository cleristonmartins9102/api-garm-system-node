import { DefaultRecords } from '../../models'

export interface InvoiceModel extends DefaultRecords {
  id_fatura: number
  numero: number
  id_faturastatus: number
  id_faturamodelo: number
  id_processo: number
  id_cliente: number
  id_agentecarga: number
  valor: number
  valor_custo: number
  valor_lucro: number
  valor_imposto_interno: number
  dta_emissao: string
  dta_vencimento: string
  nf?: number
}
