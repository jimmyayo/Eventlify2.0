import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/stores'
import * as Yup from 'yup';

export default observer(function RegisterForm() {
  const { userStore } = useStore()
  return (
    <Formik
      initialValues={{ email: '', password: '', error: null, displayName: '', username: '' }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({ error: 'Invalid email or password.' }))
      }
      validationSchema={Yup.object({
          displayName: Yup.string().required(),
          username: Yup.string().required(),
          email: Yup.string().required().email(),
          password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit}>
          <Header as='h2' content='Sign up for Eventlify' color='teal' textAlign='center' />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="email" />
          <MyTextInput name="password" placeholder="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: '10px' }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button positive content="Register" type="submit" fluid disabled={!isValid || !dirty || isSubmitting} />
        </Form>
      )}
    </Formik>
  )
})
