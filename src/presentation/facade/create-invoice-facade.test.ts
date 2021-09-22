import { CreateInvoiceFacade } from './create-invoice-facade'
import { GetOperationType } from '../../usercases/protocols/get-operation-type'
import { ProcessModel } from '../../../domain/processo/model/process'
import { GetItem } from '../../../domain/get-item'

type SutTypes = {
  sut: CreateInvoiceFacade
  getOperationType: GetOperationType
}

const makeGetOperationTypeStub = (): GetOperationType => {
  class GetOperationTypeStub implements GetOperationType {
    get (id: number): string {
      return 'captacao'
    }
  }
  return new GetOperationTypeStub()
}

const makeGetItemProcess = (): GetItem<ProcessModel> => {
  class GetProcessItemStub implements GetItem<ProcessModel> {
    async get (id: number): Promise<ProcessModel> {
      return Promise.resolve({ id_processo: 1, numero: 3 })
    }
  }
  return new GetProcessItemStub()
}

const makeSut = (): SutTypes => {
  const getOperationType = makeGetOperationTypeStub()
  const sut = new CreateInvoiceFacade(getOperationType)
  return {
    sut,
    getOperationType
  }
}

describe('Create Invoice Facade', () => {
  test('Ensure call CreateInvoiceFacade create method with correct value', async () => {
    const { sut } = makeSut()
    const facadeSpy = jest.spyOn(sut, 'create')
    await sut.create(1)
    expect(facadeSpy).toHaveBeenCalledWith(1)
  })

  test('Ensure call GetOperationType with correct value', async () => {
    const { sut, getOperationType } = makeSut()
    const getOperationTypeSpy = jest.spyOn(getOperationType, 'get')
    await sut.create(1)
    expect(getOperationTypeSpy).toHaveBeenCalledWith(1)
  })
})
