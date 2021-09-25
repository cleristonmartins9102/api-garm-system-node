import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { CaptureModel, PersonModel, ProcessModel, ProposalModel } from '../../../domain/models'
import { AddInvoiceCaptureModel } from '../../dataprovider/invoice/models/add-invoice-capture-model'
import { GetPerson, GetProposal, GetCapture, GetProcess } from '../../usercases/protocols'
import { fakeModel } from './make-model'
import { DirectorCreateInvoice } from '../invoice/protocols/director-creator-invoice'
import { CreateInvoiceBuilder } from '../invoice/protocols'

const makeGetCaptureByIdStub = (): GetCapture => {
  class GetCaptureById implements GetCapture {
    async get (id: number): Promise<CaptureModel> {
      return Promise.resolve(fakeModel.makeFakeCapture())
    }
  }
  return new GetCaptureById()
}

const makeGetProposalByIdStub = (): GetProposal => {
  class GetProposalById implements GetProposal<number> {
    async get (id: number): Promise<ProposalModel> {
      return Promise.resolve(fakeModel.makeFakeProposal())
    }
  }
  return new GetProposalById()
}

const makeGetPersonByIdStub = (): GetPerson => {
  class GetPessoaById implements GetPerson<number> {
    async get (id: number): Promise<PersonModel> {
      return Promise.resolve(fakeModel.makeFakePerson())
    }
  }
  return new GetPessoaById()
}

const makeGetProcessByIdStub = (): GetProcess => {
  class GetProcessById implements GetProcess {
    async get (id: number): Promise<ProcessModel> {
      return Promise.resolve(fakeModel.makeFakeProcess())
    }
  }
  return new GetProcessById()
}

const makeAddInvoiceCaptureStub = (): AddInvoice<AddInvoiceCaptureModel> => {
  class AddInvoiceCaptureStub implements AddInvoice<AddInvoiceCaptureModel> {
    async add (param: AddInvoiceCaptureModel): Promise<number> {
      return Promise.resolve(1)
    }
  }
  return new AddInvoiceCaptureStub()
}

const makeDirectorCreatorInvoiceStub = (builder: CreateInvoiceBuilder): DirectorCreateInvoice => {
  class DirectorCreatorInvoiceStub implements DirectorCreateInvoice<CreateInvoiceBuilder> {
    private readonly builder: CreateInvoiceBuilder
    constructor (builder: CreateInvoiceBuilder) {
      this.builder = builder
    }

    async create (): Promise<CreateInvoiceBuilder> {
      return null as any
    }
  }
  return new DirectorCreatorInvoiceStub(builder)
}

const makeCreatorInvoiceBuilderStub = <T>(): CreateInvoiceBuilder => {
  class CreatorInvoiceBuilderStub<T> implements CreateInvoiceBuilder<T> {
    async calculateItems (): Promise<T> {
      return null as any
    }

    async saveItems (): Promise<T> {
      return null as any
    }

    getItems (): any {}
  }
  return new CreatorInvoiceBuilderStub()
}

export const stub = {
  makeGetPersonByIdStub,
  makeGetProposalByIdStub,
  makeGetCaptureByIdStub,
  makeGetProcessByIdStub,
  makeAddInvoiceCaptureStub,
  makeDirectorCreatorInvoiceStub,
  makeCreatorInvoiceBuilderStub
}
