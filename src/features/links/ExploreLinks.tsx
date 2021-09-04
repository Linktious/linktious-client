import React, { useMemo } from 'react'
import { NumberParam, useQueryParam } from 'use-query-params'
import styled from 'styled-components'
import { useAppSelector } from '~/store/hooks'
import { SearchBar, useQueryParamSearch } from '~/features/common'
import {
  selectLinksByLabelsFilteredBySearchWord,
} from '~/features/links/slice'
import Links from '~/features/links/Links'


const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const LinksContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-size: xxx-large;
`

const TitleAndLinkSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const LinksSearch = styled(SearchBar)`
  width: 350px;
  margin: 4px 0 0 24px;
`

interface ExploreLinksProps {
  className?: string
}

// TODO: pagination?
const ExploreLinks = (props: ExploreLinksProps) => {
  const { className } = props

  const [labelIdFilter] = useQueryParam('labelId', NumberParam)
  const {
    searchWordFormatted: linkSearchWordFormatted,
    onSearch,
    onClearSearch,
  } = useQueryParamSearch('linkSearchWord')
  const labelsFilter = labelIdFilter ? [labelIdFilter] : null
  const links = useAppSelector(selectLinksByLabelsFilteredBySearchWord(labelsFilter, linkSearchWordFormatted))
  const linksIds = useMemo(
    () => links.map((link) => link.id),
    [links],
  )

  return (
    <Root className={className}>
      <LinksContainer>
        <TitleAndLinkSearchContainer>
          <Title>Links</Title>
          <LinksSearch
            searchWord={linkSearchWordFormatted}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
        </TitleAndLinkSearchContainer>
        <Links linksIds={linksIds} />
      </LinksContainer>
    </Root>
  )
}

export default ExploreLinks
