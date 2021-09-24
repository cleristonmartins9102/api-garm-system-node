import { PersonModel } from '../models'

export interface GetPerson<T = any> {
  get (value: T): Promise<PersonModel>
}
