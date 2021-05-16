export interface UserCredentials {
  email: string,
  password: string
}

/* eslint-disable camelcase */
export interface UserResponse {
  id: number,
  name: string,
  email: string,
  is_active: boolean,
  team_id: number,
  main_board_id: number,
  favorite_boards: number[]
}
/* eslint-enable camelcase */

export interface User {
  id: number,
  name: string,
  email: string,
  isActive: boolean,
  teamId: number,
  mainBoardId: number,
  favoriteBoards: number[]
}

/* eslint-disable camelcase */
export interface UserBasicInfoResponse {
  id: number,
  name: string,
  email: string,
  is_active: boolean,
  team_id: number,
}
/* eslint-enable camelcase */

export interface UserBasicInfo {
  id: number,
  name: string,
  email: string,
  isActive: boolean,
  teamId: number
}
