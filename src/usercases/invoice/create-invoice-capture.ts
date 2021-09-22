import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { GetProcess } from '../protocols/get-processo'
import { RecordNotFound } from '../../presentation/error/record-not-found'

export class CreateInvoiceCapture implements CreateInvoice {
  private readonly addInvoice: AddInvoice<AddInvoiceCaptureModel>
  private readonly getProcess: GetProcess

  constructor (addInvoice: AddInvoice<AddInvoiceCaptureModel>, getProcess: GetProcess) {
    this.addInvoice = addInvoice
    this.getProcess = getProcess
  }

  async create (id: number): Promise<InvoiceModel> {
    const process = await this.getProcess.get(id)
    if (!process) {
      throw new RecordNotFound(`process id:${id} not found`)
    }
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
