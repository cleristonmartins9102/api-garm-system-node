import { ProposalModel } from './model/proposal'

export interface GetProposal<T = any> {
  get (value: T): Promise<ProposalModel>
}
