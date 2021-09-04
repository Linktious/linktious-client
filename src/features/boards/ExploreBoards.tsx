import React, { useMemo } from 'react'
import styled from 'styled-components'
import { SearchBar, useQueryParamSearch } from '~/features/common'
import Boards from '~/features/boards/Boards'
import { useAppSelector } from '~/store/hooks'
import {
  selectBoardsFilteredBySearchWord,
} from '~/features/boards/slice'


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

interface ExploreBoardsProps {
  className?: string
}

const ExploreBoards = (props: ExploreBoardsProps) => {
  const { className } = props
  const {
    searchWordFormatted: boardSearchWordFormatted,
    onSearch,
    onClearSearch,
  } = useQueryParamSearch('boardSearchWord')
  const boards = useAppSelector(selectBoardsFilteredBySearchWord(boardSearchWordFormatted))
  const boardsIds = useMemo(
    () => boards.map((board) => board.id),
    [boards],
  )

  return (
    <Root className={className}>
      <BoardsContainer>
        <TitleAndBoardSearchContainer>
          <Title>Boards</Title>
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

export default ExploreBoards
