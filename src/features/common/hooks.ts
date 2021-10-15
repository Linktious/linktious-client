import React, { useCallback } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'


const useQueryParamSearch = (name: string) => {
  const [searchWord, setSearchWord] = useQueryParam(name, StringParam)

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    if (searchWord) {
      setSearchWord(event.target.value)
    } else {
      setSearchWord(undefined)
    }
  }, [])

  const onClearSearch = useCallback(() => {
    setSearchWord(undefined)
  }, [])

  const searchWordFormatted = searchWord || ''
  return {
    searchWord,
    searchWordFormatted,
    setSearchWord,
    onSearch,
    onClearSearch,
  }
}


export {
  useQueryParamSearch,
}
