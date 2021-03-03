import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'

export default function NotFound() {
   return (
      <Segment placeholder>
         <Header icon>
            <Icon name='search' />
            Oops - we've looked everywhere and could not find what you're looking for.
         </Header>
         <Segment.Inline>
            <Button as={Link} to='/activities' primary>Return to Activitiess</Button>
         </Segment.Inline>
      </Segment>
   )
}