import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import SearchBar from '~/features/common/SearchBar'
import Boards from '~/features/boards/Boards'
import { useAppSelector } from '~/store/hooks'
import {
  selectBoardsByIdsAndSearchWord,
} from '~/features/boards/slice'
import { StringParam, useQueryParam } from 'use-query-params'
import { getAuthenticatedUser } from '~/features/users/slice'


const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const BoardsContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-size: xxx-large;
`

const TitleAndBoardSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const BoardsSearch = styled(SearchBar)`
  width: 350px;
  margin: 4px 0 0 24px;
`

interface FavoriteBoardsProps {
  className?: string
}

const FavoriteBoards = (props: FavoriteBoardsProps) => {
  const { className } = props
  const [boardSearchWord, setBoardSearchWord] = useQueryParam('boardSearchWord', StringParam)
  const boardSearchWordFormatted = boardSearchWord || ''
  const user = useAppSelector(getAuthenticatedUser)
  if (!user) return null
  const boards = useAppSelector(selectBoardsByIdsAndSearchWord(user.favoriteBoards, boardSearchWordFormatted))
  const boardsIds = useMemo(
    () => boards.map((board) => board.id),
    [boards],
  )

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    if (searchWord) {
      setBoardSearchWord(event.target.value)
    }
    else {
      setBoardSearchWord(undefined)
    }
  }, [])

  const onClearSearch = useCallback(() => {
    setBoardSearchWord(undefined)
  }, [])

  return (
    <Root className={className}>
      <BoardsContainer>
        <TitleAndBoardSearchContainer>
          <Title>Favorite Boards</Title>
          <BoardsSearch
            searchWord={boardSearchWordFormatted}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
        </TitleAndBoardSearchContainer>
        <Boards boardsIds={boardsIds} />
      </BoardsContainer>
    </Root>
  )
}

export default FavoriteBoards
