import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { CaptureModel, PersonModel, ProcessModel, ProposalModel } from '../../../domain/models'
import { AddInvoiceCaptureModel } from '../../dataprovider/invoice/models/add-invoice-capture-model'
import { GetPerson, GetProposal, GetCapture, GetProcess } from '../../usercases/protocols'
import { fakeModel } from './make-model'
import { DirectorCreateInvoice } from '../invoice/protocols/director-creator-invoice'
import { InvoiceBuild } from '../invoice/protocols'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'

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

const makeDirectorCreatorInvoiceStub = (builder: InvoiceBuild): DirectorCreateInvoice => {
  class DirectorCreatorInvoiceStub implements DirectorCreateInvoice<InvoiceBuild> {
    private readonly builder: InvoiceBuild
    constructor (builder: InvoiceBuild) {
      this.builder = builder
    }

    async create (): Promise<InvoiceBuild> {
      return null as any
    }
  }
  return new DirectorCreatorInvoiceStub(builder)
}

const makeCreatorInvoiceBuilderStub = <T>(): InvoiceBuild => {
  class InvoiceBuilderStub<T> implements InvoiceBuild<T> {
    async calculateItems (): Promise<T> {
      return null as any
    }

    async saveItems (): Promise<T> {
      return null as any
    }

    async build (): Promise<InvoiceModel> {
      return fakeModel.makeFakeInvoice()
    }

    getInvoice (): InvoiceModel {
      return fakeModel.makeFakeInvoice()
    }
  }
  return new InvoiceBuilderStub()
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
