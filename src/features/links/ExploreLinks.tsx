import React, { useCallback, useMemo } from 'react'
import { Link as LinkRouter, LinkProps } from 'react-router-dom'
import { useQueryParam, NumberParam } from 'use-query-params'
import styled from 'styled-components'
import SearchBar from '~/features/components/SearchBar'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  selectSearchLinksWord,
  searchLinks,
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
  const searchLinksWord = useAppSelector(selectSearchLinksWord)
  const labelsFilter = labelIdFilter ? [labelIdFilter] : null
  const links = useAppSelector(selectLinksByLabelsFilteredBySearchWord(labelsFilter, searchLinksWord))
  const linksIds = useMemo(
    () => links.map((link) => link.id),
    [links],
  )

  const dispatch = useAppDispatch()
  // TODO: create search hook
  // TODO: add the search word to the query params so one can copy url with it
  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchLinks(event.target.value))
  }, [dispatch])
  const onClearSearch = useCallback(() => {
    dispatch(searchLinks(''))
  }, [dispatch])

  return (
    <Root className={className}>
      <LinksContainer>
        <TitleAndLinkSearchContainer>
          <Title>Explore Links</Title>
          <LinksSearch
            searchWord={searchLinksWord}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
        </TitleAndLinkSearchContainer>
        <Links linksIds={linksIds} />
      </LinksContainer>
    </Root>
  )
}

export interface LinkRouterWithLabelFilterProps extends Omit<LinkProps, 'to'> {
  labelId: number
  children: JSX.Element | JSX.Element[]
}

export const LinkRouterWithLabelFilter = (props: LinkRouterWithLabelFilterProps) => {
  const { labelId, children, ...linkRouterProps } = props

  return (
    <LinkRouter
      to={`/links?labelId=${labelId}`}
      {...linkRouterProps}
    >
      {children}
    </LinkRouter>
  )
}

export default ExploreLinks
