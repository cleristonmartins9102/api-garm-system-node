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

type SutTypes = {
  sut: CreateInvoice
  // addInvoiceItem: AddItem
  addInvoice: AddInvoice<AddInvoiceCaptureModel>
  validator: Validation
  getProcess: GetProcess
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

const makeAddInvoiceCaptureStub = (): AddInvoice<AddInvoiceCaptureModel> => {
  class AddInvoiceCaptureStub implements AddInvoice<AddInvoiceCaptureModel> {
    async add (param: AddInvoiceCaptureModel): Promise<number> {
      return Promise.resolve(1)
    }
  }
  return new AddInvoiceCaptureStub()
}

const process = 1

const makeGetProcessByIdStub = (): GetProcess => {
  class GetProcessById implements GetProcess {
    async get (id: number): Promise<ProcessModel> {
      return Promise.resolve({ id_processo: process })
    }
  }
  return new GetProcessById()
}

const makeSut = (): SutTypes => {
  const addInvoice = makeAddInvoiceCaptureStub()
  const validator = makeValidator()
  const getProcess = makeGetProcessByIdStub()
  const sut = new CreateInvoiceCapture(addInvoice, getProcess)
  return {
    sut,
    addInvoice,
    getProcess,
    validator
  }
}

describe('Create Invoice Capture', () => {
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

  // test('Ensure call AddItem with correct value', () => {
  //   const { sut, addInvoiceItem } = makeSut()
  //   const addInvoiceItemSpy = jest.spyOn(addInvoiceItem, 'add')
  //   expect(addInvoiceItemSpy).toBeCalledWith(makeFakeInvoiceData())
  // })
})
