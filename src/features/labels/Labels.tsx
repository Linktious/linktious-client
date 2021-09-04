import React from 'react'
import { LabelCard } from '~/features/labels'
import styled from 'styled-components'


// TODO: consider changing it to be axis-x scroller instead.
const LabelsRtlAndScrollerContainer = styled.div`
  margin-top: 16px;
  margin-right: 24px;
  direction: ltr;
  overflow-y: auto;
  
  /* https://css-tricks.com/custom-scrollbars-in-webkit/ */
  ::-webkit-scrollbar {
      width: 8px;
  }

  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: #d5dbdb;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }  
`

const LabelsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
`

const LabelContainer = styled.div`
  margin: 16px;
  height: fit-content;
  width: fit-content;
`

interface LabelsProps {
  className?: string
  labelsIds: number[]
}

const Labels = ({ className, labelsIds }: LabelsProps) => (
  <LabelsRtlAndScrollerContainer className={className}>
    <LabelsWrapper>
      {
        labelsIds.map((labelId) => (
          <LabelContainer
            key={`label-${labelId}`}
          >
            <LabelCard
              labelId={labelId}
            />
          </LabelContainer>
        ))
      }
    </LabelsWrapper>
  </LabelsRtlAndScrollerContainer>
)

export default Labels
