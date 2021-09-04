import React, { useMemo } from 'react'
import styled from 'styled-components'
import { SearchBar, useQueryParamSearch } from '~/features/common'
import Labels from '~/features/labels/Labels'
import { useAppSelector } from '~/store/hooks'
import {
  selectLabelsFilteredBySearchWord,
} from '~/features/labels/slice'


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
  const {
    searchWordFormatted: labelSearchWordFormatted,
    onSearch,
    onClearSearch,
  } = useQueryParamSearch('labelSearchWord')
  const labels = useAppSelector(selectLabelsFilteredBySearchWord(labelSearchWordFormatted))
  const labelsIds = useMemo(
    () => labels.map((label) => label.id),
    [labels],
  )

  return (
    <Root className={className}>
      <LabelsContainer>
        <TitleAndLabelSearchContainer>
          <Title>Labels</Title>
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
