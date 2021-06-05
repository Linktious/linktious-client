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
`

interface LabelProps {
  labelId: number
  backgroundColor: string
  className?: string
}

const Label = (props: LabelProps) => {
  const { className, labelId, backgroundColor = 'red' } = props
  const label = useAppSelector(selectLabelById(labelId))
  console.log(label)

  return (
    <ColoredLabel
      className={className}
      backgroundColor={backgroundColor}
    >
      {label?.name}
    </ColoredLabel>
  )
}

export default Label
