import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { GetProcess } from '../protocols/get-processo'
import { RecordNotFound } from '../../presentation/error/record-not-found'
import { GetCapture } from '../protocols/get-capture'
import { GetProposal } from '../../../domain/propostal/get-proposal'
import { GetPessoa } from '../../../domain/pessoa/get-pessoa'

export class CreateInvoiceCapture implements CreateInvoice {
  private readonly addInvoice: AddInvoice<AddInvoiceCaptureModel>
  private readonly getProcess: GetProcess
  private readonly getCapture: GetCapture
  private readonly getProposal: GetProposal
  private readonly getPessoa: GetPessoa

  constructor (
    addInvoice: AddInvoice<AddInvoiceCaptureModel>,
    getProcess: GetProcess,
    getCapture: GetCapture,
    getProposal: GetProposal,
    getPessoa: GetPessoa
  ) {
    this.addInvoice = addInvoice
    this.getProcess = getProcess
    this.getCapture = getCapture
    this.getProposal = getProposal
    this.getPessoa = getPessoa
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

    const proposal = await this.getProposal.get(capture.id_proposta)
    if (!proposal) {
      throw new RecordNotFound(`proposal id:${capture.id_proposta} not found`)
    }

    const costumer = await this.getPessoa.get(proposal.id_cliente)
    if (!costumer) {
      throw new RecordNotFound(`costumer id:${proposal.id_cliente} not found`)
    }

    const cargoAgent = await this.getPessoa.get(capture.id_agentecarga)
    if (!cargoAgent) {
      throw new RecordNotFound(`cargo agente id:${proposal.id_cliente} not found`)
    }

    // await this.addInvoice.add(process)
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
