import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { GetItem } from '../../../domain/get-item'
import { ProcessModel } from '../../../domain/processo/model/process'
import { GetOperationType } from '../../usercases/protocols/get-operation-type'

export class CreateInvoiceFacade implements CreateInvoice {
  private readonly getOperationType: GetOperationType
  private readonly getItemProcess: GetItem<ProcessModel>

  constructor (getOperationType: GetOperationType, getItemProcess: GetItem<ProcessModel>) {
    this.getOperationType = getOperationType
    this.getItemProcess = getItemProcess
  }

  async create (id: number): Promise<InvoiceModel> {
    await this.getItemProcess.get(id)
    this.getOperationType.get(id)
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
