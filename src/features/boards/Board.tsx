import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { searchLinksInBoard, selectBoardById, selectSearchLinks } from './slice'
import {
  selectLinksByLabelsFilteredBySearchWord,
} from '~/features/links/slice'
import styled from 'styled-components'
import { LabelTag } from '~/features/labels'
import BoardInfo from '~/features/boards/BoardInfo'
import SearchBar from '~/features/components/SearchBar'
import Links from '~/features/links/Links'


const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const BoardContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const BoardInfoWithLayout = styled(BoardInfo)`
  min-width: 350px;
  
  flex: 1;
  border-left: 1px solid #c5c5c5a8;
`

const Title = styled.div`
  font-size: xxx-large;
`

const TitleAndLinkSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const LabelsContainer = styled.div`
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

const BoardLinksSearch = styled(SearchBar)`
  width: 350px;
  margin: 4px 0 0 24px;
`

const LabelContainer = styled.div`
  margin-left: 8px;
`

interface BoardProps {
  className?: string
}

interface BoardParams {
  boardId: string
}

const Board = (props: BoardProps) => {
  const { className } = props

  const { boardId: boardIdParam } = useParams<BoardParams>()
  const boardId = Number(boardIdParam)

  const board = useAppSelector(selectBoardById(boardId))
  const searchLinksWord = useAppSelector(selectSearchLinks())
  if (!board) return null

  const links = useAppSelector(
    selectLinksByLabelsFilteredBySearchWord(board.labelsFilters, searchLinksWord),
  )
  const linksIds = useMemo(
    () => links.map((link) => link.id),
    [links],
  )

  const dispatch = useAppDispatch()

  // TODO: create search hook?
  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchLinksInBoard(event.target.value))
  }, [dispatch])
  const onClearSearch = useCallback(() => {
    dispatch(searchLinksInBoard(''))
  }, [dispatch])

  return (
    <Root className={className}>
      <BoardContainer>
        <TitleAndLinkSearchContainer>
          <Title>{board.name}</Title>
          <BoardLinksSearch
            searchWord={searchLinksWord}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
        </TitleAndLinkSearchContainer>
        <LabelsContainer>
          {
            board.labelsFilters.map((labelId) => (
              <LabelContainer
                key={`label-${labelId}`}
              >
                <LabelTag
                  labelId={labelId}
                />
              </LabelContainer>
            ))
          }
        </LabelsContainer>
        <Links linksIds={linksIds} />
      </BoardContainer>
      <BoardInfoWithLayout boardId={boardId} />
    </Root>
  )
}

export default Board
