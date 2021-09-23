import { CaptureModel } from '../../../domain/capture/model/capture'

export interface GetCapture {
  get (id: number): Promise<CaptureModel | null>
}
