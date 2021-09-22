import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { GetOperationType } from '../../usercases/protocols/get-operation-type'

export class CreateInvoiceFacade implements CreateInvoice {
  private readonly getOperationType: GetOperationType

  constructor (getOperationType: GetOperationType) {
    this.getOperationType = getOperationType
  }

  async create (id: number): Promise<InvoiceModel> {
    const operationType = this.getOperationType.get(id)
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
