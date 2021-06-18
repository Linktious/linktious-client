import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import * as types from './types'
import LinkService from './service'
import { RootState } from '~/store/rootReducer'
import { selectAllLabels } from '~/features/labels/slice'


export const fetchLinks = createAsyncThunk<types.Link[]>(
  'links/fetchLinks',
  async () => {
    return await LinkService.getLinks()
  },
)

interface LinksState {
  links: types.Link[]
}

const initialState = {
  links: [],
} as LinksState

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      // Duplicated the data for styling purposes.
      // state.links = action.payload
      const baseArray = new Array(15).fill(0)
      const duplicatedLinks = baseArray.map((i, idx): types.Link[] => action.payload.map((link): types.Link => ({
        ...link,
        id: Number(String(link.id) + String(idx)),
      })))
      state.links = duplicatedLinks.flat()
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = linksSlice.actions

export default linksSlice.reducer

export const selectAllLinks = (state: RootState) => state.links.links
export const selectLinkById = (linkId: number) => (state: RootState) => selectAllLinks(state).find((link) => link.id === linkId)
export const selectLinksByLabels = (labelsIds: number[]) => (state: RootState) => selectAllLinks(state)
  .filter((link) => link.labels.some((labelId) => labelsIds.includes(labelId)))
export const selectLinksByLabelsFilteredBySearchWord = (labelsIds: number[], searchWord: string) =>
  (state: RootState) => selectLinksByLabels(labelsIds)(state).filter((link) => link.description.toLowerCase().includes(searchWord.toLowerCase()))
