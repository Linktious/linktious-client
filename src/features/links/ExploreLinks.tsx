import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import SearchBar from '~/features/components/SearchBar'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  selectLinksFilteredBySearchWord, selectSearchLinksWord, searchLinks,
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

  const searchLinksWord = useAppSelector(selectSearchLinksWord)
  const links = useAppSelector(selectLinksFilteredBySearchWord(searchLinksWord))
  const linksIds = useMemo(
    () => links.map((link) => link.id),
    [links],
  )

  const dispatch = useAppDispatch()
  // TODO: create search hook?
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

export default ExploreLinks
