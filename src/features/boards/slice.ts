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

interface setBoardLabelsFiltersPayload {
  boardId: number
  labelsFilters: number[]
}

export const setBoardLabelsFilters = createAsyncThunk<types.Board, setBoardLabelsFiltersPayload>(
  'boards/setBoardLabelsFilters',
  async ({ boardId, labelsFilters }) => {
    return await BoardService.setBoardLabelsFilters(boardId, labelsFilters)
  },
)

interface BoardsState {
  boards: types.Board[],
  searchLinksWord: string,
  searchLabelsWord: string,
}

const initialState = {
  boards: [],
  searchLinksWord: '',
  searchLabelsWord: '',
} as BoardsState

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    searchLinksInBoard(state, action: PayloadAction<string>) {
      state.searchLinksWord = action.payload
    },
    searchLabels(state, action: PayloadAction<string>) {
      state.searchLabelsWord = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload
    })

    builder.addCase(setBoardLabelsFilters.fulfilled, (state, action) => {
      const updatedBoard = action.payload
      state.boards = state.boards.map((board) => board.id === updatedBoard.id ? updatedBoard : board)
    })
  },
})

// Action creators are generated for each case reducer function
export const { searchLinksInBoard, searchLabels } = boardsSlice.actions

export default boardsSlice.reducer

// TODO: use reselect
export const selectAllBoards = (state: RootState) => state.boards.boards
// TODO: use previous selector to get boards
export const selectBoardById = (boardId: number) => (state: RootState) => state.boards.boards.find((board) => board.id === boardId)
export const selectSearchLinks = () => (state: RootState) => state.boards.searchLinksWord
export const selectSearchLabels = () => (state: RootState) => state.boards.searchLabelsWord
