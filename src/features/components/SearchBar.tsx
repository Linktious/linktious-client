import React from 'react'
import { IconButton, InputAdornment, InputBase } from '@material-ui/core'
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
  searchWord: string
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClearSearch: () => void
}

const SearchBar = (props: SearchLinksProps) => {
  const { className, searchWord, onSearch, onClearSearch } = props

  return (
    <SearchInput
      className={className}
      id="search-bar"
      value={searchWord}
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

export default SearchBar


