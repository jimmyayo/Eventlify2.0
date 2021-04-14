import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/stores';


export default observer (function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email:'', password:''}}
            onSubmit={(values) => userStore.login(values) }
        >
            {({handleSubmit, isSubmitting}) => (
                <Form className='ui form' onSubmit={handleSubmit}>
                    <MyTextInput name='email' placeholder='email' />
                    <MyTextInput name='password' placeholder='password' type='password' />
                    <Button positive content='Login' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})