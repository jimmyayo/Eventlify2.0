import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Button,
  Container,
  Menu,
  Image,
  Dropdown,
  DropdownItem,
} from 'semantic-ui-react'
import { useStore } from '../stores/stores'

export default observer(function NavBar() {
  const {
    userStore: { user, logout } } = useStore()
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          Eventlify
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to="/activities" />
        <Menu.Item name="Errors" as={NavLink} to="/errors" />
        <Menu.Item>
          <Button
            positive
            content="Create Event"
            as={NavLink}
            to="/createActivity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || '/assets/user.png'}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <DropdownItem
                as={Link}
                to={`profiles/${user?.username}`}
                text="My Profile"
                icon="user"
              />
              <DropdownItem onClick={logout} icon="power" text="logout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
})
