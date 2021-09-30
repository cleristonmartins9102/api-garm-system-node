import { InvoiceModel } from '../../../../../domain/fatura/models/invoice-model'
import { InvoiceBuild, DirectorCreateInvoice } from '../../protocols'

export class DirectorCreatorInvoice implements DirectorCreateInvoice<InvoiceModel> {
  private readonly builder: InvoiceBuild
  constructor (builder: InvoiceBuild) {
    this.builder = builder
  }

  async create (): Promise<InvoiceModel> {
    console.log(2)
    return Promise.resolve('resolved') as any
    // await this.builder.build()
    // return 111 as any
  }
}
