import { GetProcess, GetCapture, GetPerson, GetProposal } from '../../usercases/protocols'
import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import { RecordNotFound } from '../error/record-not-found'
import { DirectorCreatorInvoiceStub } from './builder/director/director-create-invoice'
import { CreateInvoiceBuild } from './builder/build/create-invoice'
import { createModelToAddInvoice } from './helper/create-add-invoice-capture-model'

export class CreateInvoiceCapture implements CreateInvoice {
  private readonly getProcess: GetProcess
  private readonly getCapture: GetCapture
  private readonly getProposal: GetProposal
  private readonly getPerson: GetPerson

  constructor (
    getProcess: GetProcess,
    getCapture: GetCapture,
    getProposal: GetProposal,
    getPerson: GetPerson
  ) {
    this.getProcess = getProcess
    this.getCapture = getCapture
    this.getProposal = getProposal
    this.getPerson = getPerson
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

    const costumer = await this.getPerson.get(proposal.id_cliente)
    if (!costumer) {
      throw new RecordNotFound(`costumer id:${proposal.id_cliente} not found`)
    }

    const cargoAgent = await this.getPerson.get(capture.id_agentecarga)
    if (!cargoAgent) {
      throw new RecordNotFound(`cargo agente id:${proposal.id_cliente} not found`)
    }

    const addInvoiceModel = createModelToAddInvoice(process, proposal, capture)

    const builder = new CreateInvoiceBuild(addInvoiceModel)
    const director = new DirectorCreatorInvoiceStub(builder)

    // await this.addInvoice.add(process)
    return Promise.resolve({ id_fatura: 1, numero: 2 })
  }
}
