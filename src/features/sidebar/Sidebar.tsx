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
import { IconButton, Tooltip } from '@material-ui/core'
import Logo from 'assets/img/logo_transparent.png'
import CollapseLogo from 'assets/img/collapse_logo_transparent.png'


const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;
  white-space: nowrap;
  transition: width 0.5s;
  width: ${(props) => props.open ? '240px' : '56px'};
  
  & > * {
    width: inherit;
    overflow-x: hidden;
  }
`

const DrawerOpenCloseButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DrawerOpenButton = styled((props) => (
  <DrawerOpenCloseButton {...props} >
    <IconButton>
      <ChevronLeftIcon />
    </IconButton>
  </DrawerOpenCloseButton>
))`
  justify-content: flex-end;
`

const DrawerCloseButton = styled((props) => (
  <DrawerOpenCloseButton {...props} >
    <IconButton>
      <MenuIcon />
    </IconButton>
  </DrawerOpenCloseButton>
))`
  justify-content: center;
`

const LogoContainer = styled.div`
  margin: 8px 0;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const ImgLogo = styled.img`
  height: 45px;
  width: 219px;
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

interface DrawerHeaderProps {
  isOpen: boolean
  toggleDrawer: React.MouseEventHandler<HTMLButtonElement>
}

const DrawerHeader = ({ isOpen, toggleDrawer }: DrawerHeaderProps) => {
  if (isOpen) {
    return (
      <>
        <DrawerOpenButton onClick={toggleDrawer} />
        <Divider />
        <Link to="/">
          <LogoContainer>
            <ImgLogo src={Logo} />
          </LogoContainer>
        </Link>
      </>
    )
  }
  else {
    return (
      <>
        <DrawerCloseButton onClick={toggleDrawer} />
        <Divider />
        <Link to="/">
          <LogoContainer>
            <ImgLogo src={CollapseLogo} />
          </LogoContainer>
        </Link>
      </>
    )
  }
}

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
    description: 'Boards',
  }, {
    route: '/favorite-boards',
    icon: <InboxIcon />,
    description: 'Favorite Boards',
  }, {
    route: '/links',
    icon: <InboxIcon />,
    description: 'Links',
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
      <DrawerHeader
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
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
