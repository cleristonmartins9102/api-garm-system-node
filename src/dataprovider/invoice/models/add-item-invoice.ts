import { AddItemInvoice } from './add-item-invoice-super'

export interface AddItemInvoiceModel extends AddItemInvoice {
  id_fatura: number
  id_predicado: number
  id_propostapredicado: number
  id_processopredicado: number
  id_moeda: number
  id_faturaitemlegenda: number
  dta_inicio: string
  dta_final: string
}
