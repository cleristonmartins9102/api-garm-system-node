import { CaptureModel, PersonModel, ProcessModel, ProposalModel } from '../../../domain/models'
import { GetPerson } from '../../../domain/pessoa/get-person'
import { GetProposal } from '../../usercases/protocols/get-proposal'
import { GetCapture } from '../../usercases/protocols/get-capture'
import { GetProcess } from '../../usercases/protocols/get-processo'
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

export const stub = {
  makeGetPersonByIdStub,
  makeGetProposalByIdStub,
  makeGetCaptureByIdStub,
  makeGetProcessByIdStub
}
