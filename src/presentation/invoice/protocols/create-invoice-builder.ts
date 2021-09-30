import { InvoiceModel } from '../../../../domain/fatura/models/invoice-model'

export interface InvoiceBuild<T = any> {
  saveItems (): Promise<T>
  calculateItems (): Promise<T>
  build (): void
  getInvoice (): InvoiceModel
}
