import React from 'react'
import { useAppSelector } from '~/store/hooks'
import { selectBoardById } from './slice'
import { selectLinksByLabels } from '~/features/links/slice'
import Link from '~/features/links'

interface BoardProps {
  boardId: number
}

const Board = (props: BoardProps) => {
  const { boardId } = props
  // const dispatch = useAppDispatch()
  const board = useAppSelector(selectBoardById(boardId))
  const links = useAppSelector(selectLinksByLabels(board ? board.labelsFilters : []))
  console.log(links)

  return (
    <div>
      {
        links.map((link) => (
          <Link
            key={`link-${link.id}`}
            linkId={link.id}
          />
        ))
      }
    </div>
  )
}

export default Board
