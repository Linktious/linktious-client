import {
  createSlice,
  createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import * as types from './types'
import BoardService from './service'
import { RootState } from '~/store/rootReducer'


export const fetchBoards = createAsyncThunk<types.Board[]>(
  'boards/fetchBoards',
  async () => {
    return await BoardService.getBoards()
  },
)

interface BoardsState {
  boards: types.Board[],
  searchLinksWord: string,
}

const initialState = {
  boards: [],
  searchLinksWord: '',
} as BoardsState

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    searchLinks(state, action: PayloadAction<string>) {
      state.searchLinksWord = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { searchLinks } = boardsSlice.actions

export default boardsSlice.reducer

// TODO: use reselect
export const selectAllBoards = (state: RootState) => state.boards.boards
// TODO: use previous selector to get boards
export const selectBoardById = (boardId: number) => (state: RootState) => state.boards.boards.find((board) => board.id === boardId)
export const selectSearchLinks = () => (state: RootState) => state.boards.searchLinksWord
