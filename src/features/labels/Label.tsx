import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '~/store/hooks'
import { selectLabelById, selectNumberOfRelatedLinks } from '~/features/labels/slice'
import Card from '@material-ui/core/Card'
import { LinkRouterWithLabelFilter } from '~/features/links'
import { Tooltip } from '@material-ui/core'


interface ColoredLabelProps {
  readonly fontSize?: string
  readonly backgroundColor?: string
}

const ColoredLabel = styled.span.attrs((props: ColoredLabelProps) => ({
  // Setting style using attrs to optimize the render time
  style: {
    backgroundColor: props.backgroundColor || 'red',
    fontSize: props.fontSize || 'medium',
  },
}))<ColoredLabelProps>`
  color: white;
  font-family: monospace;
  border-radius: 4px;
  padding: 2px 4px;
  width: fit-content;
`

interface LabelProps {
  labelId: number
  backgroundColor?: string
  className?: string
}

const LabelTag = (props: LabelProps) => {
  const { className, labelId } = props

  const label = useAppSelector(selectLabelById(labelId))
  if (!label) return null

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

const LabelIcon = styled.div.attrs((props: LabelIconDivProps) => ({
  // Setting style using attrs to optimize the render time
  style: {
    border: `2px solid ${props.borderColor || '#80808047'}`,
  },
}))<LabelIconDivProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
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

  const numberOfRelatedLinks = useAppSelector(selectNumberOfRelatedLinks(labelId))

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
