import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/stores'

export default observer(function LoginForm() {
  const { userStore } = useStore()
  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: 'Invalid email or password.' }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit}>
          <Header as='h2' content='Login to Eventlify' color='teal' textAlign='center' />
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
          <Button positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  )
})
