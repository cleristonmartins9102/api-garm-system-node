import { CreateInvoiceFacade } from './create-invoice-facade'
import { GetOperationType } from '../../usercases/protocols/get-operation-type'

type SutTypes = {
  sut: CreateInvoiceFacade
}

const makeGetOperationTypeStub = (): GetOperationType => {
  class GetOperationTypeStub implements GetOperationType {
    get (id: number): string {
      return 'captacao'
    }
  }
  return new GetOperationTypeStub()
}

const makeSut = (): SutTypes => {
  const getOperationType = makeGetOperationTypeStub()
  const sut = new CreateInvoiceFacade(getOperationType)
  return {
    sut
  }
}

describe('Create Invoice Facade', () => {
  test('Ensure call CreateInvoiceFacade create method with correct value', async () => {
    const { sut } = makeSut()
    const facadeSpy = jest.spyOn(sut, 'create')
    await sut.create(1)
    expect(facadeSpy).toHaveBeenCalledWith(1)
  })
})
