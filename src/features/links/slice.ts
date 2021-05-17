import {
  createSlice,
  createAsyncThunk,
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
      state.links = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = linksSlice.actions

export default linksSlice.reducer

export const selectAllLinks = (state: RootState) => state.links.links
