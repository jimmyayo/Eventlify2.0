import React, { ChangeEvent, useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
   activity: Activity | undefined;
   closeForm: () => void;
   submitting: boolean;
   createOrEdit: (activity : Activity) => void;
}
export default function ActivityForm(
   {activity: selectedActivity, closeForm, submitting, createOrEdit}: Props) {

   const initialState = selectedActivity ?? {
      id: '',
      title: '',
      description: '',
      category: '',
      date: '',
      city: '',
      venue: ''
   };

   const [activity, setActivity] = useState(initialState);

   function handleSubmit() {
      createOrEdit(activity);
   }

   function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const {name, value} = e.target;
      setActivity({...activity, [name]: value});
   }

   return (
      <Segment clearing>
         <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
            <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
            <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
            <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
            <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
            <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
            <Button loading={submitting} floated='right' type='cancel' color='grey' content='Cancel' onClick={closeForm} />
            <Button floated='right' type='submit' content='Submit' />
         </Form>
      </Segment>
   )
}