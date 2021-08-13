import React, { useCallback, useMemo } from 'react'
import { Link as LinkRouter, LinkProps as LinkRouterProps, useParams } from 'react-router-dom'
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
import Card from '@material-ui/core/Card'
import { Tooltip } from '@material-ui/core'


export interface BoardRouterProps extends Omit<LinkRouterProps, 'to'> {
  boardId: number
  children: JSX.Element | JSX.Element[] | string
}

const BoardRouter = (props: BoardRouterProps) => {
  const { boardId, children, ...linkRouterProps } = props

  return (
    <LinkRouter
      to={`/board/${boardId}`}
      {...linkRouterProps}
    >
      {children}
    </LinkRouter>
  )
}

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

const BoardWithLinks = (props: BoardProps) => {
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
        <Links linksIds={linksIds}/>
      </BoardContainer>
      <BoardInfoWithLayout boardId={boardId}/>
    </Root>
  )
}

const BoardCardStyled = styled(Card)`
  width: 200px;
  height: 180px;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
`

const BoardTopSection = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardNameTooltipTitle = styled.div`
  font-size: 0.9rem;
`

const BoardNameWrapper = styled.div`
  border: 2px solid #80808047;
  background: aliceblue;
  font-family: monospace;
  font-size: x-large;
  
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BoardName = styled.div`
  margin-left: 8px;
`

const Description = styled.div`
  margin: 8px;
  font-size: 16px;
  font-family: monospace;
  line-break: anywhere;

  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const BoardLinkAddress = styled.a`
  height: 40px;
  color: #1c88e6;
  font-weight: bold;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
`

interface BoardCardProps {
  boardId: number
  className?: string
}

// TODO: link to board with links
const BoardCard = (props: BoardCardProps) => {
  const { className, boardId } = props

  const board = useAppSelector(selectBoardById(boardId))
  if (!board) return null

  return (
    <BoardCardStyled
      className={className}
      square={true}
      elevation={6}
    >
      <BoardTopSection>
        <Tooltip
          placement='top-end'
          arrow={true}
          title={
            <BoardNameTooltipTitle>
              {board.name}
            </BoardNameTooltipTitle>
          }
        >
          <BoardNameWrapper>
            <BoardName> {board.name} </BoardName>
          </BoardNameWrapper>
        </Tooltip>
        <Description>
          {board.description}
        </Description>
      </BoardTopSection>
      <BoardRouter
        boardId={board.id}
      >
        <BoardLinkAddress>
          Go to Board
        </BoardLinkAddress>
      </BoardRouter>
    </BoardCardStyled>
  )
}


export {
  BoardWithLinks,
  BoardCard,
  BoardRouter,
}
