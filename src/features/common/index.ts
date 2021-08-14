import { FavoriteStar, FavoriteStarProps } from '~/features/common/FavoriteStar'
import SearchBar from '~/features/common/SearchBar'

export * from './hooks'
export {
  SearchBar,
  FavoriteStar,
}

export type {
  FavoriteStarProps,
}

export const inCaseSensitiveSearch = (searchWord: string, ...words: string[]) => {
  const text = words.join().toLowerCase()

  return text.includes(searchWord.toLowerCase())
}
