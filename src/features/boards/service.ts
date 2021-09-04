import ApiClient from '~/apiClient'
import * as types from './types'


class BoardService {
  async getBoards(): Promise<types.Board[]> {
    const boards = (await ApiClient.get<types.BoardResponse[]>('/boards/')).data

    return boards.map((board: types.BoardResponse) => ({
      id: board.id,
      name: board.name,
      description: board.description,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
      createdByUserId: board.created_by_user_id,
      links: board.links,
    }))
  }
}


export default new BoardService()
