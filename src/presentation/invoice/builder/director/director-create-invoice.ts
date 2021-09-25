import { CreateInvoiceBuilder, DirectorCreateInvoice } from '../../protocols'

export class DirectorCreatorInvoiceStub implements DirectorCreateInvoice<CreateInvoiceBuilder> {
  private readonly builder: CreateInvoiceBuilder
  constructor (builder: CreateInvoiceBuilder) {
    this.builder = builder
  }

  async create (): Promise<CreateInvoiceBuilder> {
    return null as any
  }
}
