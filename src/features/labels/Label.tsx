import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '~/store/hooks'
import { selectLabelById } from '~/features/labels/slice'
import Card from '@material-ui/core/Card'
import { LinkRouterWithLabelFilter } from '~/features/links/ExploreLinks'
import { selectLinksByLabels } from '~/features/links/slice'
import { Tooltip } from '@material-ui/core'


interface ColoredLabelProps {
  readonly fontSize?: string
  readonly backgroundColor?: string
}

const ColoredLabel = styled.span<ColoredLabelProps>`
  color: white;
  background-color: ${({ backgroundColor = 'red' }) => backgroundColor};
  font-family: monospace;
  font-size: ${({ fontSize = 'medium' }) => fontSize};
  border-radius: 4px;
  padding: 2px 4px;
  width: fit-content;
`

interface LabelProps {
  labelId: number
  backgroundColor?: string
  className?: string
  key?: any
}

const LabelTag = (props: LabelProps) => {
  const { className, labelId } = props
  const label = useAppSelector(selectLabelById(labelId))
  if (!label) return null
  console.log(label)

  return (
    <ColoredLabel
      className={className}
      backgroundColor={label.backgroundColor}
    >
      {label.name}
    </ColoredLabel>
  )
}

const LabelCardStyled = styled(Card)`
  width: 260px;
  height: 60px;
  border-radius: 14px;
  
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const LabelTooltipTitle = styled.div`
  font-size: 0.9rem;
`

const LabelIconContainer = styled.div`
  margin-left: 16px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

interface LabelIconDivProps {
  borderColor?: string
}

const LabelIcon = styled.div<LabelIconDivProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${({ borderColor }) => borderColor ? `${borderColor}87` : '#80808047'};
  background: aliceblue;
  font-family: monospace;
  font-size: x-large;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LabelDescriptionContainer = styled.div`
  margin-left: 16px;
  font-family: monospace;
  font-size: x-large;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const LabelDescription = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
`

const LabelCard = (props: LabelProps) => {
  const { className, labelId } = props
  const label = useAppSelector(selectLabelById(labelId))
  if (!label) return null

  const numberOfRelatedLinks = useAppSelector(selectLinksByLabels([labelId])).length
  console.log(label)

  return (
    <LinkRouterWithLabelFilter
      className={className}
      labelId={labelId}
      style={{
        textDecoration: 'none',
      }}
    >
      <LabelCardStyled
        square={true}
        elevation={6}
      >
        <Tooltip
          placement='top'
          arrow={true}
          title={
            <LabelTooltipTitle>
              {numberOfRelatedLinks} related links
            </LabelTooltipTitle>
          }
        >
          <LabelIconContainer>
            <LabelIcon borderColor={label.backgroundColor}>
              {numberOfRelatedLinks}
            </LabelIcon>
          </LabelIconContainer>
        </Tooltip>
        <LabelDescriptionContainer>
          <LabelDescription>
            {label.name}
          </LabelDescription>
        </LabelDescriptionContainer>
      </LabelCardStyled>
    </LinkRouterWithLabelFilter>
  )
}

export {
  LabelTag,
  LabelCard,
}
