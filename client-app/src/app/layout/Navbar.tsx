import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
   
   return(
      <Menu inverted fixed='top'>
         <Container>
            <Menu.Item as={NavLink } exact to='/' header>
               <img src='assets/logo.png' alt='logo' style={{marginRight: '10px'}} />
               Eventlify
            </Menu.Item>
            <Menu.Item name='Events' as={NavLink} to='/activities' />
            <Menu.Item>
               <Button positive content='Create Event' as={NavLink} to='/createActivity' />
            </Menu.Item>
         </Container>
         
      </Menu>
   )
}