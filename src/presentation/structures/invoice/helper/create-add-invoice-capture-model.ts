import { CaptureModel } from '../../../../../domain/capture/model/capture'
import { ProposalModel } from '../../../../../domain/models'
import { ProcessModel } from '../../../../../domain/processo/model/process'
import { AddInvoiceCaptureModel } from '../../../../dataprovider/invoice/models'
import { dateNow } from '../../../utils'

export const createModelToAddInvoice = (processModel: ProcessModel, proposalModel: ProposalModel, captureModel: CaptureModel): AddInvoiceCaptureModel => {
  const { id_processo, id_captacao } = processModel
  const { id_cliente } = proposalModel
  const { id_agentecarga } = captureModel

  const model: AddInvoiceCaptureModel = {
    id_faturamodelo: 2,
    id_faturastatus: 1,
    id_processo,
    id_cliente,
    id_agentecarga,
    valor: 100,
    valor_custo: 33,
    valor_lucro: 10,
    valor_imposto_interno: 20,
    dta_emissao: dateNow,
    dta_vencimento: '21-12-2021',
    nf: 3333
  }
  return model
}
