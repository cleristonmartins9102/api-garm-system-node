import { Filter } from './filter'
import { prepare } from '../../helper/prepare-value'

describe('Test filter', () => {
  test('Should return correct value', () => {
    const prop = 'nome'
    const operator = '='
    const value = 'cleriston'
    const valuePrepared = prepare(value)
    const sut = new Filter(prop, operator, value)
    const filterString = `${prop}${operator}${valuePrepared}`
    expect(sut.dump()).toBe(filterString)
  })
})
