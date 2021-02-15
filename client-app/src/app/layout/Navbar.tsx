import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/stores';

export default function NavBar() {
   const {activityStore} = useStore();
   
   return(
      <Menu inverted fixed='top'>
         <Container>
            <Menu.Item header>
               <img src='assets/logo.png' alt='logo' style={{marginRight: '10px'}} />
               Eventlify
            </Menu.Item>
            <Menu.Item name='Events' />

            <Menu.Item>
               <Button positive content='Create Event' onClick={() => activityStore.openForm()} />
            </Menu.Item>
         </Container>
         
      </Menu>
   )
}