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
      labelsFilters: board.labels_filters,
    }))
  }

  async setBoardLabelsFilters(boardId: number, labelsFilters: number[]): Promise<types.Board> {
    const board = (await ApiClient.post<types.BoardResponse>(`/boards/${boardId}/set_labels_filters`, labelsFilters)).data

    return {
      id: board.id,
      name: board.name,
      description: board.description,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
      createdByUserId: board.created_by_user_id,
      labelsFilters: board.labels_filters,
    }
  }
}


export default new BoardService()
