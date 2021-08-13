import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import * as types from './types'
import LabelService from './service'
import { RootState } from '~/store/rootReducer'


export const fetchLabels = createAsyncThunk<types.Label[]>(
  'labels/fetchLabels',
  async () => {
    return await LabelService.getLabels()
  },
)

interface LabelsState {
  labels: types.Label[]
}

const initialState = {
  labels: [],
} as LabelsState

export const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLabels.fulfilled, (state, action) => {
      // Duplicated data for styling purposes.
      // state.labels = action.payload.map((label) => ({
      //   ...label,
      //   backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      // }))
      const baseArray = new Array(50).fill(0)
      const duplicatedLabels = action.payload.concat(baseArray.map((i, idx) => action.payload.map((label) => ({
        ...label,
        id: Number(String(label.id) + String(idx)),
      }))).flat())

      state.labels = duplicatedLabels.map((label) => ({
        ...label,
        backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      }))
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = labelsSlice.actions

export default labelsSlice.reducer

export const selectAllLabels = (state: RootState) => state.labels.labels
export const selectLabelById = (labelId: number) => (state: RootState) => selectAllLabels(state).find((label) => label.id === labelId)
export const selectLabelsByIds = (labelsIds: number[]) => (state: RootState) => selectAllLabels(state)
  .filter((label) => labelsIds.includes(label.id))
export const selectLabelsFilteredBySearchWord = (searchWord: string) => (state: RootState) => selectAllLabels(state).filter((label) => label.name.toLowerCase().includes(searchWord.toLowerCase()))