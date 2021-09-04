import { Filter } from '../filter/filter'
import { LogicalEnum } from '../logical-enum'
import { Criteria } from './criteria'

type SutTypes = {
  sut: Criteria
  filter: Filter
}

const makeFilter = (): Filter => new Filter('nome', '=', 'any_value')
const makeCriteria = (): Criteria => new Criteria()

const makeSut = (): SutTypes => {
  const filter = makeFilter()
  const sut = makeCriteria()
  return {
    sut,
    filter
  }
}

describe('Test Criteria', () => {
  test('Should ensure add method receive correct value', () => {
    const { sut, filter } = makeSut()
    const add = jest.spyOn(sut, 'add')
    sut.add(filter)
    expect(add).toHaveBeenCalledWith(filter)
  })

  test('Ensure criteria dump the correct value', () => {
    const result = '( nome="any_value" AND nome="any_value" OR ( nome="any_value" AND nome="any_value") OR ( nome="any_value"))'
    const { sut, filter } = makeSut()
    const criteria = makeCriteria()
    const criterias = makeCriteria()
    criteria.add(makeFilter())
    criteria.add(makeFilter())
    criterias.add(makeFilter())
    const filter2 = makeFilter()
    const filter3 = makeFilter()
    sut.add(filter)
    sut.add(filter2)
    sut.add(criteria, LogicalEnum.OR)
    sut.add(criterias, LogicalEnum.OR)
    expect(sut.dump()).toBe(result)
  })
})
