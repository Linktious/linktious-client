import React from 'react'
import styled from 'styled-components'
import { BoardCard } from '~/features/boards/Board'


// TODO: consider changing it to be axis-x scroller instead.
const BoardsRtlAndScrollerContainer = styled.div`
  margin-top: 16px;
  margin-right: 24px;
  direction: ltr;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  
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

const BoardsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
`

const BoardContainer = styled.div`
  margin: 16px;
  height: fit-content;
  width: fit-content;
`

interface BoardsProps {
  className?: string
  boardsIds: number[]
}

const Boards = ({ className, boardsIds }: BoardsProps) => (
  <BoardsRtlAndScrollerContainer className={className}>
    <BoardsWrapper>
      {
        boardsIds.map((boardId) => (
          <BoardContainer
            key={`board-${boardId}`}
          >
            <BoardCard boardId={boardId} />
          </BoardContainer>
        ))
      }
    </BoardsWrapper>
  </BoardsRtlAndScrollerContainer>
)

export default Boards
