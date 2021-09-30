import { InvoiceModel } from '../../../../../domain/fatura/models/invoice-model'
import { AddInvoiceCaptureModel } from '../../../../dataprovider/invoice/models'
import { InvoiceBuild } from '../../protocols'

export default class InvoiceBuilder implements InvoiceBuild {
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

  build (): void {
  }

  getInvoice (): InvoiceModel {
    return null as any
    // return null as any
  }
}
