import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';


export default function LoginForm() {
    return (
        <Formik
            initialValues={{email:'', password:''}}
            onSubmit={(values) => console.log(values) }
        >
            {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit}>
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <Button positive content='Login' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
}