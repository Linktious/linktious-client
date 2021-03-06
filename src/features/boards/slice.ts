import {
  createSlice,
  createAsyncThunk, PayloadAction, createSelector,
} from '@reduxjs/toolkit'
import * as types from './types'
import BoardService from './service'
import { RootState } from '~/store'
import { inCaseSensitiveSearch } from '~/features/common'
import { selectFavoriteBoards } from '~/features/users/slice'


export const fetchBoards = createAsyncThunk<types.Board[]>(
  'boards/fetchBoards',
  async () => {
    return await BoardService.getBoards()
  },
)

interface BoardsState {
  boards: types.Board[],
  searchLabelsWord: string,
}

const initialState = {
  boards: [],
  searchLabelsWord: '',
} as BoardsState

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    searchLabels(state, action: PayloadAction<string>) {
      state.searchLabelsWord = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      // Duplicate boards for styling purposes
      state.boards = action.payload
      const baseArray = new Array(50).fill(0)
      state.boards = action.payload.concat(baseArray.map((i, idx) => action.payload.map((board) => ({
        ...board,
        id: Number(String(board.id) + String(idx)),
      }))).flat())
    })
  },
})

// Action creators are generated for each case reducer function
export const { searchLabels } = boardsSlice.actions

export default boardsSlice.reducer

export const selectAllBoards = (state: RootState) => state.boards.boards

export const selectBoardsByIds = (boardIds: number[]) => (state: RootState) => {
  const boards = selectAllBoards(state)

  return boards.filter((board) => boardIds.includes(board.id))
}

const filterBoardsBySearchWord = (boards: types.Board[], searchWord: string) =>
  boards.filter((board) => inCaseSensitiveSearch(searchWord, board.name))

export const selectBoardsFilteredBySearchWord = (searchWord: string) => (state: RootState) => {
  const boards = selectAllBoards(state)

  return filterBoardsBySearchWord(boards, searchWord)
}

export const selectBoardsByIdsAndSearchWord = (boardsIds: number[], searchWord: string) =>
  (state: RootState) => {
    const boards = selectBoardsByIds(boardsIds)(state)

    return filterBoardsBySearchWord(boards, searchWord)
  }

export const selectBoardById = (boardId: number) => (state: RootState) => {
  const boards = selectAllBoards(state)

  return boards.find((board) => board.id === boardId)
}

export const selectSearchLabels = (state: RootState) => state.boards.searchLabelsWord

export const selectIsFavoriteBoard = (boardId: number) => createSelector(
  selectFavoriteBoards,
  (favoriteBoards) => favoriteBoards.includes(boardId),
)
