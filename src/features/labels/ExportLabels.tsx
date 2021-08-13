import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import SearchBar from '~/features/components/SearchBar'
import Labels from '~/features/labels/Labels'
import { useAppSelector } from '~/store/hooks'
import {
  selectLabelsFilteredBySearchWord,
} from '~/features/labels/slice'
import { StringParam, useQueryParam } from 'use-query-params'


const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const LabelsContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-size: xxx-large;
`

const TitleAndLabelSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const LabelsSearch = styled(SearchBar)`
  width: 350px;
  margin: 4px 0 0 24px;
`

interface ExploreLabelsProps {
  className?: string
}

const ExploreLabels = (props: ExploreLabelsProps) => {
  const { className } = props
  const [labelSearchWord, setLabelSearchWord] = useQueryParam('labelSearchWord', StringParam)
  const labelSearchWordFormatted = labelSearchWord || ''
  const labels = useAppSelector(selectLabelsFilteredBySearchWord(labelSearchWordFormatted))
  const labelsIds = useMemo(
    () => labels.map((label) => label.id),
    [labels],
  )

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    if (searchWord) {
      setLabelSearchWord(event.target.value)
    }
    else {
      setLabelSearchWord(undefined)
    }
  }, [])

  const onClearSearch = useCallback(() => {
    setLabelSearchWord(undefined)
  }, [])

  return (
    <Root className={className}>
      <LabelsContainer>
        <TitleAndLabelSearchContainer>
          <Title>Explore Labels</Title>
          <LabelsSearch
            searchWord={labelSearchWordFormatted}
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
        </TitleAndLabelSearchContainer>
        <Labels labelsIds={labelsIds} />
      </LabelsContainer>
    </Root>
  )
}

export default ExploreLabels
