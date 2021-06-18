import React from 'react'
import styled from 'styled-components'
import {useAppSelector} from "~/store/hooks";
import {selectBoardById} from "~/features/boards/slice";


const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
`

interface BoardInfoProps {
  boardId: number,
  className?: string
}


const BoardInfo = (props: BoardInfoProps) => {
  const { boardId, className } = props
  const board = useAppSelector(selectBoardById(boardId))
  if (!board) return null

  return (
    <RootDiv className={className}>
        Hey {board.name}
    </RootDiv>
  )
}


export default BoardInfo
