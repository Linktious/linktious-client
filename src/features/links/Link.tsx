import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '~/store/hooks'
import { selectLinkById } from '~/features/links/slice'
import { selectLabelsByIds } from '~/features/labels/slice'
import Label from '~/features/labels'


const LinkLabel = styled(Label)`
  margin-right: 4px;
`

interface LinkProps {
  linkId: number
}

const Link = (props: LinkProps) => {
  const { linkId } = props
  const link = useAppSelector(selectLinkById(linkId))
  const labels = useAppSelector(selectLabelsByIds(link ? link.labels : []))
  console.log('link', link)
  console.log('labels', labels)


  return (
    <div>
      <h1>Link {link?.description}</h1>
      {
        labels.map((label) => (
          <LinkLabel
            key={`label-${label.id}`}
            labelId={label.id}
            backgroundColor='red'
          />
        ))
      }
    </div>
  )
}

export default Link
