import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import { useAppSelector } from '~/store/hooks'
import { selectLinkById } from '~/features/links/slice'
import { selectLabelsByIds } from '~/features/labels/slice'
import { Tooltip } from '@material-ui/core'
import { LinkRouterWithLabelFilter } from '~/features/links/ExploreLinks'


const LinkCard = styled(Card)`
  width: 200px;
  height: 260px;
  border-radius: 14px;
  
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`

const LinkIcon = styled.div`
  margin-top: 16px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const LinkIconImage = styled.img`
  width: 90px;
  height: 90px;
  padding: 12px;
  border-radius: 50%;
  border: 2px solid #80808047;
  background: aliceblue;
`

const Labels = styled.div`
  margin-top: 16px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const LabelTooltipTitle = styled.div`
  font-size: 0.9rem;
`

interface LinkLabelProps {
  backgroundColor?: string
}

const LinkLabel = styled.div<LinkLabelProps>`
  margin-right: 4px;
  height: 10px;
  width: 10px;
  background: ${(props) => props.backgroundColor || '#' + Math.floor(Math.random()*16777215).toString(16)};
  border-radius: 50%;
`

const Description = styled.div`
  margin: 8px;
  font-size: 16px;
  font-family: monospace;
  line-break: anywhere;
  
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const LinkAddress = styled.a`
  height: 40px;
  color: #1c88e6;
  font-weight: bold;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
`

interface LinkProps {
  linkId: number
}

const Link = (props: LinkProps) => {
  const { linkId } = props
  const link = useAppSelector(selectLinkById(linkId))
  if (!link) return null

  const labels = useAppSelector(selectLabelsByIds(link.labels))
  console.log('link', link)
  console.log('labels', labels)

  return (
    <LinkCard square={true} elevation={12}>
      <LinkIcon>
        <LinkIconImage src={link.iconUrl}/>
      </LinkIcon>
      <Labels>
        {
          labels.map((label) => (
            <LinkRouterWithLabelFilter
              key={`label-${label.id}`}
              labelId={label.id}
            >
              <Tooltip
                title={<LabelTooltipTitle>{label.name}</LabelTooltipTitle>}
                arrow={true}
              >

                <LinkLabel
                  backgroundColor={label.backgroundColor}
                />
              </Tooltip>
            </LinkRouterWithLabelFilter>
          ))
        }
      </Labels>
      <Description>
        {link.description}
      </Description>
      <LinkAddress
        href={link.url}
        target='_blank'
      >
        Go to Link
      </LinkAddress>
    </LinkCard>
  )
}

export default Link
