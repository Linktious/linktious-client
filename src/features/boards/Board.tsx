import React, { useCallback, useMemo } from 'react'
import { uniq } from 'lodash'
import {
  Link as LinkRouter,
  LinkProps as LinkRouterProps,
  useParams,
} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  selectBoardById,
  selectIsFavoriteBoard,
} from './slice'
import {
  selectLinksByIdsFilteredBySearchWord,
  selectLinksByLabelsFilteredBySearchWord,
} from '~/features/links/slice'
import styled from 'styled-components'
import {
  SearchBar,
  FavoriteStar,
  FavoriteStarProps, useQueryParamSearch,
} from '~/features/common'
import { LabelTag } from '~/features/labels'
import BoardInfo from '~/features/boards/BoardInfo'
import Links from '~/features/links/Links'
import {
  Card,
  Badge,
  Tooltip,
} from '@material-ui/core'
import { toggleUserFavoriteBoard } from '~/features/users/slice'

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

const FavoriteIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
`

interface BoardFavoriteStarProps extends Omit<FavoriteStarProps, 'checked'> {
  className?: string
  boardId: number
}

const BoardFavoriteStar = (props: BoardFavoriteStarProps) => {
  const { className, boardId, ...favoriteStarProps } = props
  const isFavoriteBoard = useAppSelector(selectIsFavoriteBoard(boardId))

  const dispatch = useAppDispatch()
  const onFavoriteStarClick = useCallback(
    () => dispatch(toggleUserFavoriteBoard(boardId)),
    [boardId],
  )

  return (
    <FavoriteIconWrapper className={className}>
      <FavoriteStar
        checked={isFavoriteBoard}
        onClick={onFavoriteStarClick}
        {...favoriteStarProps}
      />
    </FavoriteIconWrapper>
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

const TopSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleAndSearchWrapper = styled.div`
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
  if (!board) return null

  const {
    searchWordFormatted: linkSearchWordFormatted,
    onSearch,
    onClearSearch,
  } = useQueryParamSearch('linkSearchWord')

  const links = useAppSelector(selectLinksByIdsFilteredBySearchWord(board.links, linkSearchWordFormatted))
  const uniqueLabelIds = useMemo(
    () => uniq(links.map((link) => link.labels).flat()),
    [links],
  )

  return (
    <Root className={className}>
      <BoardContainer>
        <TopSection>
          <TitleAndSearchWrapper>
            <Title>{board.name}</Title>
            <BoardLinksSearch
              searchWord={linkSearchWordFormatted}
              onSearch={onSearch}
              onClearSearch={onClearSearch}
            />
          </TitleAndSearchWrapper>
          <BoardFavoriteStar boardId={board.id} />
        </TopSection>
        <LabelsContainer>
          {
            uniqueLabelIds.map((labelId) => (
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
        <Links linksIds={board.links}/>
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

const BoardBottomSection = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardNameTooltipTitle = styled.div`
  font-size: 0.9rem;
`

const BoardName = styled.div`
  border: 2px solid #80808047;
  background: aliceblue;
  font-family: monospace;
  font-size: x-large;
  padding-left: 8px;

  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const BoardCardFavoriteStar = styled(BoardFavoriteStar)`
  .MuiIconButton-root {
    padding: 4px;
  }
`

const BoardLinkAddress = styled.div`
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

const BoardCard = (props: BoardCardProps) => {
  const { className, boardId } = props

  const board = useAppSelector(selectBoardById(boardId))
  if (!board) return null

  return (
    <Badge
      showZero={true}
      badgeContent={board.links.length * 100}
      max={999}
      color='primary'
    >
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
            <BoardName> {board.name} </BoardName>
          </Tooltip>
          <Description>
            {board.description}
          </Description>
        </BoardTopSection>
        <BoardBottomSection>
          <BoardCardFavoriteStar boardId={board.id} />
          <BoardRouter boardId={board.id}>
            <BoardLinkAddress>
              Go to Board
            </BoardLinkAddress>
          </BoardRouter>
        </BoardBottomSection>
      </BoardCardStyled>
    </Badge>
  )
}


export {
  BoardWithLinks,
  BoardCard,
  BoardRouter,
}
