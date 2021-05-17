import ApiClient from '~/apiClient'
import * as types from './types'


class LinkService {
  async getLinks(): Promise<types.Link[]> {
    const links = (await ApiClient.get<types.LinkResponse[]>('/links/')).data

    return links.map((link: types.LinkResponse) => ({
      id: link.id,
      iconUrl: link.icon_url,
      url: link.url,
      description: link.description,
      createdAt: link.created_at,
      createdByUserId: link.created_by_user_id,
      labels: link.labels,
    }))
  }
}


export default new LinkService()
