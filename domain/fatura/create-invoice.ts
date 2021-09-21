import { InvoiceModel } from './models/invoice-model'

export interface CreateInvoice {
  create (id: number): Promise<InvoiceModel>
}
