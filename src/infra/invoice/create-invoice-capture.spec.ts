import { CaptureModel, ProcessModel } from '../../../domain/models'
import { GetPerson, GetProposal, GetProcess } from '../../usercases/protocols'
import { CreateInvoice } from '../../../domain/fatura/create-invoice'
import { CreateInvoiceCapture } from './create-invoice-capture'
import { Validation } from '../../presentation/protocols/validation'
import { makeValidator } from '../../dataprovider/invoice/factor/addInvoice/validator'
import { RecordNotFound } from '../../presentation/error/record-not-found'
import { GetCapture } from '../../usercases/protocols/get-capture'
import { fakeModel } from '../../presentation/test/make-model'
import { stub } from '../../presentation/test/make-stubs'
import { createModelToAddInvoice } from './helper/create-add-invoice-capture-model'
import { DirectorCreatorInvoice } from './builder/director/director-create-invoice'
import { InvoiceModel } from '../../../domain/fatura/models/invoice-model'
import InvoiceBuilder from './builder/build/create-invoice'
import { InvoiceBuild } from './protocols'

type SutTypes = {
  sut: CreateInvoice
  validator: Validation
  getProcess: GetProcess
  getCapture: GetCapture
  getProposal: GetProposal
  getPerson: GetPerson
}

const processNumber: number = 1

const makeSut = (): SutTypes => {
  const getProposal = stub.makeGetProposalByIdStub()
  // const directorInvoice = stub.makeDirectorCreatorInvoiceStub()
  const validator = makeValidator()
  const getProcess = stub.makeGetProcessByIdStub()
  const getCapture = stub.makeGetCaptureByIdStub()
  const getPerson = stub.makeGetPersonByIdStub()
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

jest.mock('./builder/director/director-create-invoice')
jest.mock('./builder/build/create-invoice')
jest.mock('./helper/create-add-invoice-capture-model', () => {
  return {
    createModelToAddInvoice: jest.fn(() => {
      return fakeModel.makeFakeAddInvoice()
    })
  }
})

describe('Create Invoice Capture', () => {
  afterEach(() => {
    const mockInvoiceBuilder = InvoiceBuilder as any
    const mockDirector = DirectorCreatorInvoice as any
    mockInvoiceBuilder.mockClear()
    mockDirector.mockClear()
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
    const error = new RecordNotFound(`proposal id:${fakeModel.makeFakeCapture().id_proposta} not found`)
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
    const error = new RecordNotFound(`costumer id:${fakeModel.makeFakePerson().id_individuo} not found`)
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

  test('Ensure CreateInvoiceCapture calls Builder with correct value', async () => {
    const { sut } = makeSut()
    await sut.create(processNumber)
    expect(InvoiceBuilder).toBeCalledWith(fakeModel.makeFakeAddInvoice())
  })

  test('Ensure CreateInvoiceCapture calls Director with correct value', async () => {
    const { sut } = makeSut()
    await sut.create(processNumber)
    const mockCall = (InvoiceBuilder as any).mock.instances[0]
    expect(DirectorCreatorInvoice).toBeCalledWith(mockCall)
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

  test('Ensure CreateInvoiceCapture throw if createModelToAddInvoice throws', async () => {
    const { sut } = makeSut()
    const mockcreateModelToAddInvoice = createModelToAddInvoice as any
    mockcreateModelToAddInvoice.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if Builder throws', async () => {
    const { sut } = makeSut()
    const mock = InvoiceBuilder as any
    const mockDirectorCreatorInvoice = DirectorCreatorInvoice as any
    mockDirectorCreatorInvoice.mockImplementationOnce(() => {
      return {
        create: async function () {
          const build: InvoiceBuild = mockDirectorCreatorInvoice.mock.calls[0]
          await build.build()
        }
      }
    })
    mock.mockImplementation(() => {
      return {
        build: () => {
          throw new Error('Test error')
        }
      }
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture throw if Director throws', async () => {
    const { sut } = makeSut()
    const mockDirectorCreatorInvoice = DirectorCreatorInvoice as any
    mockDirectorCreatorInvoice.mockImplementationOnce(() => {
      return {
        create: async function () {
          throw new Error()
        }
      }
    })
    await expect(sut.create(processNumber)).rejects.toThrow()
  })

  test('Ensure CreateInvoiceCapture returns FaturaModel on success', async () => {
    const { sut } = makeSut()
    const mock = InvoiceBuilder as any
    mock.mockImplementationOnce(() => {
      return {
        build: function (): void {
          this.invoice = fakeModel.makeFakeInvoice()
        },
        getInvoice: function (): InvoiceModel {
          return this.invoice
        }
      }
    })
    const mockDirectorCreatorInvoice = DirectorCreatorInvoice as any
    mockDirectorCreatorInvoice.mockImplementationOnce(() => {
      return {
        create: async function () {
          const build: InvoiceBuild = mockDirectorCreatorInvoice.mock.calls[0][0]
          build.build()
          return Promise.resolve(build.getInvoice())
        }
      }
    })
    await expect(sut.create(processNumber)).resolves.toEqual(fakeModel.makeFakeInvoice())
  })
})
