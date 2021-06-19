import React, { useCallback } from 'react'
import { IconButton, InputAdornment, InputBase } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { searchLinks, selectSearchLinks } from '~/features/boards/slice'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import styled from 'styled-components'


const SearchInput = styled(InputBase)`
  .MuiInputBase-input {
    color: grey;
  }
`


interface SearchLinksProps {
  className?: string
}

const SearchLinks = (props: SearchLinksProps) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const searchLinksWord = useAppSelector(selectSearchLinks())
  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchLinks(event.target.value))
  }, [dispatch])
  const onClearSearch = useCallback(() => {
    dispatch(searchLinks(''))
  }, [dispatch])

  return (
    <SearchInput
      className={className}
      id="search-board"
      value={searchLinksWord}
      onChange={onSearch}
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon color="disabled"/>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={onClearSearch}>
            <ClearIcon color="disabled"/>
          </IconButton>
        </InputAdornment>
      }
      inputProps={{
        'aria-label': 'naked',
      }}
    />
  )
}

export default SearchLinks


