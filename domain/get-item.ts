export interface GetItem<T> {
  get (id: number): Promise<T>
}
