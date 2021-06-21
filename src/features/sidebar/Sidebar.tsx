import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


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

// TODO: add animation
// TODO: Fix open/close menu css
// TODO: select logo
// TODO: select icons for explore boards / links
// TODO: mark the tab item that is currently selected
// TODO: add tooltip if closed
const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

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
        <Link to="/boards">
          <ListItem>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Explore Boards' />
          </ListItem>
        </Link>
        <Link to="/links">
          <ListItem>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary='Explore Links' />
          </ListItem>
        </Link>
      </List>
    </StyledDrawer>
  )
}

export default Sidebar
