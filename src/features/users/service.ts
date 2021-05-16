import ApiClient from '~/apiClient'
import * as types from './types'


class Service {
  async login(userCredentials: types.UserCredentials): Promise<types.User> {
    const user = (await ApiClient.post<types.UserResponse>('/users/login', userCredentials)).data

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      teamId: user.team_id,
      mainBoardId: user.main_board_id,
      favoriteBoards: user.favorite_boards,
    }
  }

  async getUserBasicInfo(id: number): Promise<types.UserBasicInfo> {
    const user = (await ApiClient.get<types.UserBasicInfoResponse>(`/users/${id}`)).data

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      teamId: user.team_id,
    }
  }

  async setUserMainBoard(userId: number, boardId: number): Promise<types.User> {
    const user = (await ApiClient.put<types.UserResponse>(`/users/${userId}/set_main_board`, null, {
      params: {
        board_id: boardId,
      },
    })).data

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      teamId: user.team_id,
      mainBoardId: user.main_board_id,
      favoriteBoards: user.favorite_boards,
    }
  }

  async setUserFavoriteBoards(userId: number, boardsIds: number[]): Promise<types.User> {
    const user = (await ApiClient.put<types.UserResponse>(`/users/${userId}/set_favorite_boards`, boardsIds)).data

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      teamId: user.team_id,
      mainBoardId: user.main_board_id,
      favoriteBoards: user.favorite_boards,
    }
  }
}


export default new Service()
