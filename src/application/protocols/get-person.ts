import { PersonModel } from '../../../domain/models'

export interface GetPerson<T = any> {
  get (value: T): Promise<PersonModel>
}
