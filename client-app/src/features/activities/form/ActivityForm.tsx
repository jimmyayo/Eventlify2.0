import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Segment, Button, Label } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/stores';
import { v4 as uuid } from 'uuid';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { CategoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer(function ActivityForm() {

   const { activityStore } = useStore();
   const { createActivity, updateActivity, loadActivity, loading, loadingInitial } = activityStore;
   const { id } = useParams<{ id: string }>();
   const history = useHistory();
   const [activity, setActivity] = useState<Activity>({
      id: '',
      title: '',
      description: '',
      category: '',
      date: null,
      city: '',
      venue: ''
   });

   useEffect(() => {
      if (id) loadActivity(id).then(activity => setActivity(activity!));
   }, [id, loadActivity]);

   const validationSchema = Yup.object({
      title: Yup.string().required('The activity title is required'),
      description: Yup.string().required('The activity description is required'),
      category: Yup.string().required(),
      date: Yup.string().required(),
      city: Yup.string().required(),
      venue: Yup.string().required()
   })

   if (loadingInitial) return (
      <LoadingComponent content='Loading...' />
   )

   return (
      <Segment clearing>
         <Formik 
            enableReinitialize 
            initialValues={activity}
            validationSchema={validationSchema} 
            onSubmit={values => console.log(values)}> 
            {({ handleSubmit }) => (
               <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  <MyTextInput name='title' placeholder='Title' />
                  <MyTextArea rows={3} placeholder='Description' name='description' />
                  <MySelectInput options={CategoryOptions} placeholder='Category' name='category' />
                  <MyDateInput
                     placeholderText='Date' 
                     name='date'
                     showTimeSelect
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy h:mm aa' />
                  <MyTextInput placeholder='City' name='city' />
                  <MyTextInput placeholder='Venue' name='venue' />
                  <Button as={Link} to='/activities' floated='right' type='cancel' color='grey' content='Cancel' />
                  <Button loading={loading} floated='right' type='submit' positive content='Submit' />
               </Form>
            )}
         </Formik>

      </Segment>
   )
})