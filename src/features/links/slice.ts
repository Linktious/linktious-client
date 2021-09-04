import {
  createSlice,
  createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import * as types from './types'
import LinkService from './service'
import { RootState } from '~/store/rootReducer'
import { inCaseSensitiveSearch } from '~/features/common'


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
  reducers: {

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
      state.links = [...action.payload, ...duplicatedLinks.flat()]
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = linksSlice.actions

export default linksSlice.reducer


export const selectAllLinks = (state: RootState) => state.links.links

export const selectLinkById = (linkId: number) => (state: RootState) => {
  const links = selectAllLinks(state)

  return links.find((link) => link.id === linkId)
}

export const selectLinksByIds = (linksIds: number[]) => (state: RootState) => {
  const links = selectAllLinks(state)

  return links.filter((link) => linksIds.includes(link.id))
}

export const selectLinksByLabels = (labelsIds: number[]) => (state: RootState) => {
  const links = selectAllLinks(state)

  return links.filter((link) => {
    return link.labels.some((labelId) => labelsIds.includes(labelId))
  })
}

const filterLinksBySearchWord = (links: types.Link[], searchWord: string) =>
  links.filter((link) => inCaseSensitiveSearch(searchWord, link.description, link.url))

export const selectLinksFilteredBySearchWord = (searchWord: string) => (state: RootState) => {
  const links = selectAllLinks(state)

  return filterLinksBySearchWord(links, searchWord)
}

export const selectLinksByIdsFilteredBySearchWord = (linksIds: number[], searchWord: string) =>
  (state: RootState) => {
    const links = selectLinksByIds(linksIds)(state)

    return filterLinksBySearchWord(links, searchWord)
  }

export const selectLinksByLabelsFilteredBySearchWord = (labelsIds: number[] | null, searchWord: string) =>
  (state: RootState) => {
    let links
    if (labelsIds !== null) {
      links = selectLinksByLabels(labelsIds)(state)
    }
    else {
      links = selectAllLinks(state)
    }

    return filterLinksBySearchWord(links, searchWord)
  }
