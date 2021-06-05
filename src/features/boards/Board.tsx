import React from 'react'
import { useAppSelector } from '~/store/hooks'
import { selectBoardById } from './slice'
import { selectLinksByLabels } from '~/features/links/slice'
import Link from '~/features/links'
import styled from 'styled-components'

interface BoardProps {
  boardId: number
}

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`

const Title = styled.div`
  font-size: xxx-large;
`

const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
`

const LinkContainer = styled.div`
  margin: 16px;
  height: fit-content;
  width: fit-content;
`

const Board = (props: BoardProps) => {
  const { boardId } = props
  // const dispatch = useAppDispatch()
  const board = useAppSelector(selectBoardById(boardId))
  if (!board) return null

  const links = useAppSelector(selectLinksByLabels(board.labelsFilters))
  console.log(links)

  return (
    <Root>
      <Title>Tutorials</Title>
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
    </Root>
  )
}

export default Board
