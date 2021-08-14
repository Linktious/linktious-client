import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
  searchLabels,
  selectBoardById,
  selectSearchLabels,
  setBoardLabelsFilters,
} from '~/features/boards/slice'
import { Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import Card from '@material-ui/core/Card'
import { selectLabelsFilteredBySearchWord } from '~/features/labels/slice'
import { LabelTag } from '~/features/labels'
import { fetchUserInfo, selectUserById } from '~/features/users/slice'


const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SectionTitleText = styled.span`
  font-size: 24px;
  color: #000000ab;
`

interface SectionProps {
  title: string
  icon: JSX.Element
  children: JSX.Element | JSX.Element[] | string
  className?: string
}

const Section = ({ title, icon, children, className }: SectionProps) => (
  <SectionContainer className={className}>
    <SectionTitleContainer>
      {icon}
      <SectionTitleText>
        {title}
      </SectionTitleText>
    </SectionTitleContainer>
    {children}
  </SectionContainer>
)

const DescriptionTitleIcon = styled.span`
  font-size: 38px;
  font-weight: bolder;
  font-family: monospace, emoji, math, serif;
  margin-right: 8px;
`

const TextContent = styled.div`
  margin-left: 36px;
  font-family: monospace;
  font-size: large;
`

interface DescriptionProps {
  description: string
}

const Description = ({ description }: DescriptionProps) => (
  <Section
    icon={
      <DescriptionTitleIcon>
        i
      </DescriptionTitleIcon>
    }
    title="Description"
  >
    <TextContent>
      {description}
    </TextContent>
  </Section>
)

const SearchInput = styled(InputBase)`
  .MuiInputBase-input {
    width: 100%;
    color: grey;
  }
`

interface SearchLabelsProps {
  className?: string
}

const SearchLabels = (props: SearchLabelsProps) => {
  const { className } = props

  const dispatch = useAppDispatch()
  const searchLabelsWord = useAppSelector(selectSearchLabels)

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchLabels(event.target.value))
  }, [dispatch])

  const onClearSearch = useCallback(() => {
    dispatch(searchLabels(''))
  }, [dispatch])

  return (
    <SearchInput
      className={className}
      id="search-label"
      value={searchLabelsWord}
      onChange={onSearch}
      placeholder="Search..."
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon color="disabled"/>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={onClearSearch}>
            <ClearIcon color="disabled"/>
          </IconButton>
        </InputAdornment>
      }
      inputProps={{
        'aria-label': 'naked',
      }}
    />
  )
}

const LabelsIcon = styled(LocalOfferIcon)`
  margin-right: 8px;
`

const BoardLabelsContent = styled.div`
  margin: 4px 36px 0 36px;
`

const LabelsCard = styled(Card)`
  height: 400px;
  border-radius: 14px;
  background: #f4f3f35c;
  
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`

const LabelsGroup = styled(FormGroup)`
    margin: 8px 8px 0 16px;
`

const LabelCheckbox = styled(Checkbox)`
  // TODO: fix without using important
  padding: 0 !important;
`

interface BoardLabelsProps {
  boardId: number
  labels: number[]
  boardLabels: number[]
}

const BoardLabels = (props: BoardLabelsProps) => {
  const { boardId, labels, boardLabels } = props

  const dispatch = useAppDispatch()

  const onLabelCheckboxClick = useCallback((selectedLabelId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    let updatedLabels
    if (checked) {
      updatedLabels = [...boardLabels, selectedLabelId]
    }
    else {
      updatedLabels = boardLabels.filter((labelId) => labelId !== selectedLabelId)
    }

    dispatch(setBoardLabelsFilters({
      boardId,
      labelsFilters: updatedLabels,
    }))
  }, [boardLabels])

  return (
    <Section
      title="Board Labels"
      icon={
        <LabelsIcon />
      }
    >
      <BoardLabelsContent>
        <SearchLabels />
        <LabelsCard square={false} elevation={2}>
          <LabelsGroup>
            {
              labels.map((labelId) => (
                <FormControlLabel
                  key={`board-label-form-control-${labelId}`}
                  control={
                    <LabelCheckbox
                      size="small"
                      checked={boardLabels.includes(labelId)}
                      onChange={(event) => onLabelCheckboxClick(labelId, event)}
                    />
                  }
                  label={
                    <LabelTag
                      key={`board-label-${labelId}`}
                      labelId={labelId}
                    />
                  }
                />
              ))
            }
          </LabelsGroup>
        </LabelsCard>
      </BoardLabelsContent>
    </Section>
  )
}

const AboutIcon = styled(FormatAlignLeftIcon)`
  margin-right: 8px;
`

const AboutContent = styled.div`
  margin: 0 10%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AboutContentRow = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

interface AboutProps {
  className?: string
  createdAt: Date
  updatedAt: Date
  username: string
}

const About = ({ className, username, createdAt, updatedAt }: AboutProps) => (
  <Section
    className={className}
    title="About"
    icon={
      <AboutIcon />
    }
  >
    <AboutContent>
      <AboutContentRow>
        <span>Creator:</span>
        <span>{username}</span>
      </AboutContentRow>
      <AboutContentRow>
        <span>Created at:</span>
        <span>{createdAt}</span>
      </AboutContentRow>
      <AboutContentRow>
        <span>Updated at:</span>
        <span>{updatedAt}</span>
      </AboutContentRow>
    </AboutContent>
  </Section>
)

const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  > * {
    margin-left: 8px;
    margin-top: 16px;
  }
  
  > :last-child {
    margin-top: auto
  }
`

const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #000000ab;
`

interface BoardInfoProps {
  boardId: number,
  className?: string
}

const BoardInfo = (props: BoardInfoProps) => {
  const { boardId, className } = props

  const dispatch = useAppDispatch()
  const board = useAppSelector(selectBoardById(boardId))
  if (!board) return null
  const userInfo = useAppSelector(selectUserById(board.createdByUserId))
  const searchLabelsWord = useAppSelector(selectSearchLabels)
  const labels = useAppSelector(selectLabelsFilteredBySearchWord(searchLabelsWord))

  useEffect(() => {
    if (userInfo === undefined) {
      dispatch(fetchUserInfo(board.createdByUserId))
    }
  }, [dispatch])

  if (userInfo === undefined) {
    return (
      <div>
          loading...
      </div>)
  }

  return (
    <RootDiv className={className}>
      <Title>Details</Title>
      <Description
        description={board.description}
      />
      <BoardLabels
        boardId={board.id}
        labels={labels.map((label) => label.id)}
        boardLabels={board.labelsFilters}
      />
      <About
        createdAt={board.createdAt}
        updatedAt={board.updatedAt}
        username={userInfo.name}
      />
    </RootDiv>
  )
}

export default BoardInfo
