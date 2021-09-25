export interface CreateInvoiceBuilder<T = any> {
  saveItems (): Promise<T>
  calculateItems (): Promise<T>
  getItems (): any
}
