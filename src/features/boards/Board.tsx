import React from 'react'
import { useAppSelector } from '~/store/hooks'
import { selectBoardById, selectSearchLinks } from './slice'
import {
  selectLinksByLabelsFilteredBySearchWord,
} from '~/features/links/slice'
import Link from '~/features/links'
import styled from 'styled-components'
import Label from '~/features/labels'
import SearchLinks from '~/features/boards/SearchLinks'
import BoardInfo from '~/features/boards/BoardInfo'


const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const BoardContent = styled.div`
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

const BoardLinksSearch = styled(SearchLinks)`
  width: 350px;
  margin: 4px 0 0 24px;
`

const LabelContainer = styled.div`
  margin-left: 8px;
`

const LinksRtlAndScrollerContainer = styled.div`
  direction: rtl;
  overflow-y: auto;
  
  /* https://css-tricks.com/custom-scrollbars-in-webkit/ */
  ::-webkit-scrollbar {
      width: 8px;
  }

  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #d5dbdb;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }  
`

const LinksContainer = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-end;
`

const LinkContainer = styled.div`
  margin: 16px;
  height: fit-content;
  width: fit-content;
`

interface BoardProps {
  boardId: number
  className?: string
}

const Board = (props: BoardProps) => {
  const { className, boardId } = props
  const board = useAppSelector(selectBoardById(boardId))
  const searchLinksWord = useAppSelector(selectSearchLinks())
  if (!board) return null

  const links = useAppSelector(
    selectLinksByLabelsFilteredBySearchWord(board.labelsFilters, searchLinksWord),
  )
  console.log(links)

  return (
    <Root className={className}>
      <BoardContent>
        <TitleAndLinkSearchContainer>
          <Title>{board.name}</Title>
          <BoardLinksSearch />
        </TitleAndLinkSearchContainer>
        <LabelsContainer>
          {
            board.labelsFilters.map((labelId) => (
              <LabelContainer
                key={`label-${labelId}`}
              >
                <Label
                  labelId={labelId}
                />
              </LabelContainer>
            ))
          }
        </LabelsContainer>
        <LinksRtlAndScrollerContainer>
          <LinksContainer>
            {
              links.map((link) => (
                <LinkContainer
                  key={`link-${link.id}`}
                >
                  <Link
                    linkId={link.id}
                  />
                </LinkContainer>
              ))
            }
          </LinksContainer>
        </LinksRtlAndScrollerContainer>
      </BoardContent>
      <BoardInfoWithLayout boardId={boardId} />
    </Root>
  )
}

export default Board
