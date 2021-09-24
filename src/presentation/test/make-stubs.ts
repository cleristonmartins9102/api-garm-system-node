import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { CaptureModel, PersonModel, ProcessModel, ProposalModel } from '../../../domain/models'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { GetPerson, GetProposal, GetCapture, GetProcess } from '../../usercases/protocols'
import { fakeModel } from './make-model'

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

export const stub = {
  makeGetPersonByIdStub,
  makeGetProposalByIdStub,
  makeGetCaptureByIdStub,
  makeGetProcessByIdStub,
  makeAddInvoiceCaptureStub
}
