import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { GetProcess } from '../protocols/get-processo'
import { RecordNotFound } from '../../presentation/error/record-not-found'
import { GetCapture } from '../protocols/get-capture'

export class CreateInvoiceCapture implements CreateInvoice {
  private readonly addInvoice: AddInvoice<AddInvoiceCaptureModel>
  private readonly getProcess: GetProcess
  private readonly getCapture: GetCapture

  constructor (addInvoice: AddInvoice<AddInvoiceCaptureModel>, getProcess: GetProcess, getCapture: GetCapture) {
    this.addInvoice = addInvoice
    this.getProcess = getProcess
    this.getCapture = getCapture
  }

  async create (id: number): Promise<InvoiceModel> {
    const process = await this.getProcess.get(id)
    if (!process) {
      throw new RecordNotFound(`process id:${id} not found`)
    }

    const capture = await this.getCapture.get(process.id_captacao)
    if (!capture) {
      throw new RecordNotFound(`capture id:${id} not found`)
    }

    // await this.addInvoice.add(process)
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
