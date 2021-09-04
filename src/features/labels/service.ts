import ApiClient from '~/apiClient'
import * as types from './types'


class LabelService {
  async getLabels(): Promise<types.Label[]> {
    const labels = (await ApiClient.get<types.LabelResponse[]>('/labels/')).data

    return labels.map((label: types.LabelResponse) => ({
      id: label.id,
      name: label.name,
      createdAt: label.created_at,
      createdByUserId: label.created_by_user_id,
    }))
  }
}


export default new LabelService()
