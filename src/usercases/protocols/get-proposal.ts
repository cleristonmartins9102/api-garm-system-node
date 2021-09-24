import { ProposalModel } from '../../../domain/models'

export interface GetProposal<T = any> {
  get (value: T): Promise<ProposalModel>
}
