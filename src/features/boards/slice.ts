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
      // Duplicate boards for styling purposes
      state.boards = action.payload
      const baseArray = new Array(50).fill(0)
      state.boards = action.payload.concat(baseArray.map((i, idx) => action.payload.map((board) => ({
        ...board,
        id: Number(String(board.id) + String(idx)),
      }))).flat())
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
export const selectBoardsByIds = (boardIds: number[]) => (state: RootState) => selectAllBoards(state).filter((board) => boardIds.includes(board.id))
const filterBoardsBySearchWord = (boards: types.Board[], searchWord: string) => boards.filter((board) => board.name.toLowerCase().includes(searchWord.toLowerCase()))
export const selectBoardsFilteredBySearchWord = (searchWord: string) => (state: RootState) => filterBoardsBySearchWord(selectAllBoards(state), searchWord)
export const selectBoardsByIdsAndSearchWord = (boardsIds: number[], searchWord: string) => (state: RootState) => filterBoardsBySearchWord(selectBoardsByIds(boardsIds)(state), searchWord)
// TODO: use previous selector to get boards
export const selectBoardById = (boardId: number) => (state: RootState) => state.boards.boards.find((board) => board.id === boardId)
export const selectSearchLinks = () => (state: RootState) => state.boards.searchLinksWord
export const selectSearchLabels = () => (state: RootState) => state.boards.searchLabelsWord
export const selectIsFavoriteBoard = (boardId: number) => (state: RootState) => state.users.authenticatedUser ? state.users.authenticatedUser.favoriteBoards.includes(boardId) : false
