import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '~/store/hooks'
import { selectLabelById } from '~/features/labels/slice'


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

const Label = (props: LabelProps) => {
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

export default Label
