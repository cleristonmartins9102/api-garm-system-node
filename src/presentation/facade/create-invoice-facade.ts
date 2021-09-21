import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'

export class CreateInvoiceFacade implements CreateInvoice {
  async create (): Promise<InvoiceModel> {
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
