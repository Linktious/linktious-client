import React from 'react'
import styled from 'styled-components'
import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'


const TooltipTitle = styled.div`
  font-size: 0.9rem;
`

const FavoriteIcon = styled(IconButton)`
  width: fit-content;
`

export interface FavoriteStarProps extends IconButtonProps {
  className?: string
  checked: boolean
}

const FavoriteStar = (props: FavoriteStarProps) => {
  const { className, checked, ...buttonProps } = props

  return (
    <Tooltip
      className={className}
      placement='top'
      arrow={true}
      title={
        <TooltipTitle>
          {checked ? 'Remove from favorites' : 'Add to favorites'}
        </TooltipTitle>
      }
    >
      <FavoriteIcon
        color='inherit'
        {...buttonProps}
      >
        {
          checked ?
            <StarRoundedIcon style={{ color: 'goldenrod' }} /> :
            <StarBorderRoundedIcon />
        }
      </FavoriteIcon>
    </Tooltip>
  )
}

export {
  FavoriteStar,
}

export default FavoriteStar
