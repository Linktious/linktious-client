import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Tooltip } from '@material-ui/core'


const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;
  white-space: nowrap;
  
  width: ${(props) => props.open ? '240px' : '56px'};
  & > * {
    width: inherit;
    overflow-x: hidden;
  }
`

interface DrawerOpenCloseButtonProps {
  open: boolean
}

const DrawerOpenCloseButton = styled.button<DrawerOpenCloseButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.open ? 'flex-end' : 'center'};
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bolder;
`

const StyledTooltip = styled(({ className, children, ...props }) => (
  <Tooltip classes={{ popper: className }} {...props} >
    {children}
  </Tooltip>
))`
  & .MuiTooltip-tooltip {
    font-size: 12px;
  }
`

// TODO: add animation
// TODO: Fix open/close menu css
// TODO: select logo
// TODO: select icons for explore boards / links
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const items = [{
    route: '/boards',
    icon: <InboxIcon />,
    description: 'Explore Boards',
  }, {
    route: '/links',
    icon: <InboxIcon />,
    description: 'Explore Links',
  }, {
    route: '/favorite-boards',
    icon: <InboxIcon />,
    description: 'Favorite Boards',
  }, {
    route: '/labels',
    icon: <InboxIcon />,
    description: 'Labels',
  }]

  return (
    <StyledDrawer
      variant="permanent"
      open={isOpen}
    >
      <DrawerOpenCloseButton
        onClick={toggleDrawer}
        open={isOpen}
      >
        {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
      </DrawerOpenCloseButton>
      <Divider />
      <Link to="/">
        <List>
          <Logo>L</Logo>
        </List>
      </Link>
      <Divider />
      <List>
        {items.map(({ route, icon, description }, idx) => (
          <StyledTooltip
            key={`route-${idx}`}
            title={isOpen ? '' : description}
            placement='right-end'
            arrow
          >
            <ListItem
              button
              component={Link}
              to={route}
              selected={pathname == route}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={description} />
            </ListItem>
          </StyledTooltip>
        ))}
      </List>
    </StyledDrawer>
  )
}

export default Sidebar
