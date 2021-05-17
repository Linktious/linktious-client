import React, { useEffect } from 'react'
import { fetchBoards } from '~/features/boards/index'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { selectAllBoards } from '~/features/boards/slice'

const Boards = () => {
  const dispatch = useAppDispatch()
  const boards = useAppSelector(selectAllBoards)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [])


  return (
    <div>
            Boards!
      {
        boards.map((board) => (
          <span key={board.id}>{board.name}</span>
        ))
      }
    </div>
  )
}

export default Boards
