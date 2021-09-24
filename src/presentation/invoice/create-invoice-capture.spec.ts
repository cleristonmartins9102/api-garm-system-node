import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { CreateInvoiceCapture } from './create-invoice-capture'
import { InvoiceItemOperationModel } from '../../dataprovider/model/invoice-item-operation-model '
import { ValidationComposite } from '../../../../../../Courses/node/src/presentation/helpers/validations/validation-composite'
import { RequiredField } from '../helper/validators/validations/required-field/required-field'
import { Validation } from '../protocols/validation'
import { makeValidator } from '../../dataprovider/invoice/factor/addInvoice/validator'
import { GetProcess } from '../../usercases/protocols/get-processo'
import { ProcessModel } from '../../../domain/processo/model/process'
import { RecordNotFound } from '../error/record-not-found'
import { GetCapture } from '../../usercases/protocols/get-capture'
import { CaptureModel } from '../../../domain/capture/model/capture'
import { GetProposal } from '../../../domain/propostal/get-proposal'
import { ProposalModel } from '../../../domain/propostal/model/proposal'
import { PessoaModel } from '../../../domain/pessoa/model/pessoa-mode'
import { GetPerson } from '../../../domain/pessoa/get-pessoa'

type SutTypes = {
  sut: CreateInvoice
  validator: Validation
  getProcess: GetProcess
  getCapture: GetCapture
  getProposal: GetProposal
  getPerson: GetPerson
}

const processNumber: number = 1
const capture = 100

const makeFakeInvoiceData = (): AddInvoiceCaptureModel => ({
  id_faturamodelo: 1,
  id_faturastatus: 1,
  id_processo: 1,
  id_cliente: 1,
  id_agentecarga: 2,
  valor: 100,
  valor_custo: 150,
  valor_lucro: 200,
  valor_imposto_interno: 233,
  dta_emissao: '28/12/2020',
  dta_vencimento: '30/12/2020',
  nf: 3333
})
const makeFakeCaptureModel = (): CaptureModel => (
  {
    id_captacao: 2,
    id_proposta: 333,
    id_agentecarga: 441
  }
)

const makeFakePersonModel = (): PessoaModel => ({
  id_individuo: 2222,
  id_endereco: 33444,
  identificador: 2222,
  apelido: 'any_nickname',
  nome: 'any_nome',
  tipo: 'any_type'
})

const makeFakeProposalData = (): ProposalModel => ({
  id_cliente: '2222',
  id_coadjuvante: 22222,
  id_qualificacao: 4444,
  id_regime: 3333,
  id_vendedor: 545555,
  numero: 10,
  dta_emissao: '29/12/2020',
  dta_validade: '30/01/2021',
  prazo_pagamento: 20,
  status: 3,
  classificacao: 'modelo'
})

const makeFakeProcessData = (): ProcessModel => ({
  id_processo: 1,
  id_captacao: 2
})

const makeAddInvoiceCaptureStub = (): AddInvoice<AddInvoiceCaptureModel> => {
  class AddInvoiceCaptureStub implements AddInvoice<AddInvoiceCaptureModel> {
    async add (param: AddInvoiceCaptureModel): Promise<number> {
      return Promise.resolve(1)
    }
  }
  return new AddInvoiceCaptureStub()
}

const makeGetProcessByIdStub = (): GetProcess => {
  class GetProcessById implements GetProcess {
    async get (id: number): Promise<ProcessModel> {
      return Promise.resolve(makeFakeProcessData())
    }
  }
  return new GetProcessById()
}

const makeGetCaptureByIdStub = (): GetCapture => {
  class GetCaptureById implements GetCapture {
    async get (id: number): Promise<CaptureModel> {
      return Promise.resolve(makeFakeCaptureModel())
    }
  }
  return new GetCaptureById()
}

const makeGetProposalByIdStub = (): GetProposal => {
  class GetProposalById implements GetProposal<number> {
    async get (id: number): Promise<ProposalModel> {
      return Promise.resolve(makeFakeProposalData())
    }
  }
  return new GetProposalById()
}

const makeGetPersonByIdStub = (): GetPerson => {
  class GetPessoaById implements GetPerson<number> {
    async get (id: number): Promise<PessoaModel> {
      return Promise.resolve(makeFakePersonModel())
    }
  }
  return new GetPessoaById()
}

const makeSut = (): SutTypes => {
  const getProposal = makeGetProposalByIdStub()
  const validator = makeValidator()
  const getProcess = makeGetProcessByIdStub()
  const getCapture = makeGetCaptureByIdStub()
  const getPerson = makeGetPersonByIdStub()
  const sut = new CreateInvoiceCapture(getProcess, getCapture, getProposal, getPerson)
  return {
    sut,
    getProcess,
    getCapture,
    validator,
    getProposal,
    getPerson
  }
}

describe('Create Invoice Capture', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Ensure call GetProcessById with correct value', async () => {
    const { sut, getProcess } = makeSut()
    const getProcessSpy = jest.spyOn(getProcess, 'get')
    await sut.create(processNumber)
    expect(getProcessSpy).toBeCalledWith(processNumber)
  })

  test('Ensure CreateInvoiceCapture trows if GetProcessById returns null value', async () => {
    const { sut, getProcess } = makeSut()
    jest.spyOn(getProcess, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(processNumber)).rejects.toThrow(new RecordNotFound(`process id:${processNumber} not found`))
  })

  test('Ensure call GetCaptureById with correct value', async () => {
    const { sut, getCapture, getProcess } = makeSut()
    const getProcessSpy = jest.spyOn(getProcess, 'get')
    const getCaptureSpy = jest.spyOn(getCapture, 'get')
    await sut.create(processNumber)
    const process: ProcessModel = await getProcessSpy.mock.results[0].value
    const idCapture = process.id_captacao
    expect(getCaptureSpy).toBeCalledWith(idCapture)
  })

  test('Ensure CreateInvoiceCapture throws if GetCaptureById returns null value', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(getCapture, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(processNumber)).rejects.toThrow(new RecordNotFound(`capture id:${processNumber} not found`))
  })

  test('Ensure call GetProposalById with correct value', async () => {
    const { sut, getCapture, getProposal } = makeSut()
    const getCaptureSpy = jest.spyOn(getCapture, 'get')
    const getProposalSpy = jest.spyOn(getProposal, 'get')
    await sut.create(processNumber)
    const captacao: CaptureModel = await getCaptureSpy.mock.results[0].value
    const idProposal = captacao.id_proposta
    expect(getProposalSpy).toBeCalledWith(idProposal)
  })

  test('Ensure CreateInvoiceCapture throws if GetProposalById returns null value', async () => {
    const { sut, getProposal } = makeSut()
    const error = new RecordNotFound(`proposal id:${makeFakeCaptureModel().id_proposta} not found`)
    jest.spyOn(getProposal, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(processNumber)).rejects.toThrow(error)
  })

  test('Ensure call GetPessoaById with correct value', async () => {
    const { sut, getPerson, getProposal } = makeSut()
    const getPessoaSpy = jest.spyOn(getPerson, 'get')
    const getProposalSpy = jest.spyOn(getProposal, 'get')
    await sut.create(processNumber)
    const idCliente = await getProposalSpy.mock.results[0].value
    expect(getPessoaSpy).toBeCalledWith(idCliente.id_cliente)
  })

  test('Ensure CreateInvoiceCapture throws if GetPessoaById returns null value', async () => {
    const { sut, getPerson } = makeSut()
    const error = new RecordNotFound(`costumer id:${makeFakePersonModel().id_individuo} not found`)
    jest.spyOn(getPerson, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(processNumber)).rejects.toThrow(error)
  })

  test('Ensure call GetPessoaById for get Cargo Agent with correct value', async () => {
    const { sut, getPerson, getCapture } = makeSut()
    const getPessoaSpy = jest.spyOn(getPerson, 'get')
    const getCaptureSpy = jest.spyOn(getCapture, 'get')
    await sut.create(processNumber)
    const capture = await getCaptureSpy.mock.results[0].value
    expect(getPessoaSpy.mock.calls[1][0]).toBe(capture.id_agentecarga)
  })

  test('Ensure CreateInvoiceCapture throw if is error', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(sut, 'create').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if GetCapture throws', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(getCapture, 'get').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if GetProcess throws', async () => {
    const { sut, getProcess } = makeSut()
    jest.spyOn(getProcess, 'get').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if GetProposal throws', async () => {
    const { sut, getProposal } = makeSut()
    jest.spyOn(getProposal, 'get').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })
})