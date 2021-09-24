import { CaptureModel } from '../../../domain/models'

export interface GetCapture {
  get (id: number): Promise<CaptureModel | null>
}
