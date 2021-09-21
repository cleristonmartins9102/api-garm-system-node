import { InvoiceModel } from './models/invoice-model'

export interface CreateInvoice {
  create (number: number): Promise<InvoiceModel>
}
