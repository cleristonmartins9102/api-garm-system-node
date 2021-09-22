export interface AddInvoice<T> {
  add (param: T): Promise<number>
}
