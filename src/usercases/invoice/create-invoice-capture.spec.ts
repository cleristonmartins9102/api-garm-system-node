import { AddInvoice } from '../../../domain/fatura/add-invoice'
import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { AddInvoiceCaptureModel } from '../../dataprovider/model/add-invoice-capture-model'
import { CreateInvoiceCapture } from './create-invoice-capture'
import { InvoiceItemOperationModel } from '../../dataprovider/model/invoice-item-operation-model '
import { ValidationComposite } from '../../../../../../Courses/node/src/presentation/helpers/validations/validation-composite'
import { RequiredField } from '../../presentation/helper/validators/validations/required-field/required-field'
import { Validation } from '../../presentation/protocols/validation'
import { makeValidator } from '../../dataprovider/invoice/factor/addInvoice/validator'
import { GetProcess } from '../protocols/get-processo'
import { ProcessModel } from '../../../domain/processo/model/process'
import { RecordNotFound } from '../../presentation/error/record-not-found'
import { GetCapture } from '../protocols/get-capture'
import { CaptureModel } from '../../../domain/capture/model/capture'

type SutTypes = {
  sut: CreateInvoice
  // addInvoiceItem: AddItem
  addInvoice: AddInvoice<AddInvoiceCaptureModel>
  validator: Validation
  getProcess: GetProcess
  getCapture: GetCapture
}

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

const process = 1
const capture = 100

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
      return Promise.resolve({ id_captacao: capture })
    }
  }
  return new GetCaptureById()
}

const makeSut = (): SutTypes => {
  const addInvoice = makeAddInvoiceCaptureStub()
  const validator = makeValidator()
  const getProcess = makeGetProcessByIdStub()
  const getCapture = makeGetCaptureByIdStub()
  const sut = new CreateInvoiceCapture(addInvoice, getProcess, getCapture)
  return {
    sut,
    addInvoice,
    getProcess,
    getCapture,
    validator
  }
}

describe('Create Invoice Capture', () => {
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })
  test('Ensure call GetProcessById with correct value', async () => {
    const { sut, getProcess } = makeSut()
    const getProcessSpy = jest.spyOn(getProcess, 'get')
    await sut.create(process)
    expect(getProcessSpy).toBeCalledWith(process)
  })

  test('Ensure CreateInvoiceCapture returns error if GetProcessById returns null value', async () => {
    const { sut, getProcess } = makeSut()
    jest.spyOn(getProcess, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(process)).rejects.toThrow(new RecordNotFound(`process id:${process} not found`))
  })

  test('Ensure call GetCaptureById with correct value', async () => {
    const { sut, getCapture, getProcess } = makeSut()
    const getProcessSpy = jest.spyOn(getProcess, 'get')
    const getCaptureSpy = jest.spyOn(getCapture, 'get')
    await sut.create(capture)
    const process: ProcessModel = await getProcessSpy.mock.results[0].value
    const idCapture = process.id_captacao
    expect(getCaptureSpy).toBeCalledWith(idCapture)
  })

  test('Ensure CreateInvoiceCapture returns error if GetCaptureById returns null value', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(getCapture, 'get').mockImplementationOnce(async (): Promise<any> => {
      return null
    })
    await expect(sut.create(process)).rejects.toThrow(new RecordNotFound(`capture id:${process} not found`))
  })

  test('Ensure CreateInvoiceCapture throw if is error', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(sut, 'create').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(1)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if GetCapture throws', async () => {
    const { sut, getCapture } = makeSut()
    jest.spyOn(getCapture, 'get').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(1)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if GetProcess throws', async () => {
    const { sut, getProcess } = makeSut()
    jest.spyOn(getProcess, 'get').mockImplementationOnce(async (id) => {
      throw new Error()
    })
    await expect(sut.create(1)).rejects.toThrow()
  })
})
