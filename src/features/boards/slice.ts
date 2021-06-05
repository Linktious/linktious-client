import {
  createSlice,
  createAsyncThunk,
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
  boards: types.Board[]
}

const initialState = {
  boards: [],
} as BoardsState

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = boardsSlice.actions

export default boardsSlice.reducer

// TODO: used reselect
export const selectAllBoards = (state: RootState) => state.boards.boards
// TODO: use previous selector to get boards
export const selectBoardById = (boardId: number) => (state: RootState) => state.boards.boards.find((board) => board.id === boardId)
