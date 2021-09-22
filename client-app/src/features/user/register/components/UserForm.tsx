import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import TextInput from '../../../../app/common/form/TextInput';
import FileInput from '../../../../app/common/form/FileInput';

const validate = combineValidators({
    email: isRequired('Email'),
    username: isRequired('Username'),
    password: isRequired('Password')
});

const UserForm = (props) => {
    const handleSubmit = (values) => {
        console.log(values);
        props.next(values);
    }
    
    return (
        <FinalForm
            onSubmit={handleSubmit}
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                dirtySinceLastSubmit
            }) => (
                <Form size='big' onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Register'
                        color='blue'
                        textAlign='left'
                    />
                    <Field
                        name='username' 
                        component={TextInput}
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        initialValue={props.data.username}
                        />
                    <Field
                        name='email' 
                        component={TextInput}
                        icon='at'
                        iconPosition='left'
                        initialValue={props.data.email}
                        placeholder='Email' />
                    <Field
                        name='password'
                        component={TextInput}
                        icon='lock'
                        iconPosition='left'
                        initialValue={props.data.password}
                        placeholder='Password'
                        type='password'
                    />
                    <Field
                        name='photo'
                        component={FileInput}
                        placeholder='photo'
                    />
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage
                        error={submitError}
                        text='Invalid email or password'
                        />
                    )}
                    <Button
                        disabled={invalid && !dirtySinceLastSubmit}
                        loading={submitting}
                        primary
                        size='large'
                        floated='right'
                        circular>
                        Next
                    </Button>
                </Form>
            )}
            />
    )
}

export default UserForm;