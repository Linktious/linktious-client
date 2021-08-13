import {
  createSlice,
  createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import * as types from './types'
import LinkService from './service'
import { RootState } from '~/store/rootReducer'


export const fetchLinks = createAsyncThunk<types.Link[]>(
  'links/fetchLinks',
  async () => {
    return await LinkService.getLinks()
  },
)

interface LinksState {
  links: types.Link[]
  searchLinksWord: string,
}

const initialState = {
  links: [],
  searchLinksWord: '',
} as LinksState

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    searchLinks(state, action: PayloadAction<string>) {
      state.searchLinksWord = action.payload
    },
  },
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
export const { searchLinks } = linksSlice.actions

export default linksSlice.reducer

export const selectAllLinks = (state: RootState) => state.links.links
export const selectLinkById = (linkId: number) => (state: RootState) => selectAllLinks(state).find((link) => link.id === linkId)
export const selectLinksByLabels = (labelsIds: number[]) => (state: RootState) => selectAllLinks(state)
  .filter((link) => link.labels.some((labelId) => labelsIds.includes(labelId)))
export const selectSearchLinksWord = (state: RootState) => state.links.searchLinksWord
const filterLinksBySearchWord = (links: types.Link[], searchWord: string) => links.filter((link) => link.description.toLowerCase().includes(searchWord.toLowerCase()))
export const selectLinksFilteredBySearchWord = (searchWord: string) => (state: RootState) => filterLinksBySearchWord(selectAllLinks(state), searchWord)
export const selectLinksByLabelsFilteredBySearchWord = (labelsIds: number[] | null, searchWord: string) =>
  (state: RootState) => {
    let links
    if (labelsIds !== null ) {
      links = selectLinksByLabels(labelsIds)(state)
    }
    else {
      links = selectAllLinks(state)
    }

    return filterLinksBySearchWord(links, searchWord)
  }
