import { AddInvoiceCaptureModel } from '../../../../dataprovider/invoice/models'
import { CreateInvoiceBuilder } from '../../protocols'

export class CreateInvoiceBuild implements CreateInvoiceBuilder {
  private readonly processModel: AddInvoiceCaptureModel

  constructor (processModel: AddInvoiceCaptureModel) {
    this.processModel = processModel
  }

  async saveItems (): Promise<any> {
    return null as any
  }

  async calculateItems (): Promise<any> {
    return null as any
  }

  getItems (): any {}
}
