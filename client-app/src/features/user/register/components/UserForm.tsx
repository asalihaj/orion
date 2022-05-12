import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header, Icon, Label, Message } from 'semantic-ui-react';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import TextInput from '../../../../app/common/form/TextInput';
import FileInput from '../../../../app/common/form/FileInput';
import '../styles.css';

const validate = combineValidators({
    email: isRequired('Email'),
    username: isRequired('Username'),
    password: isRequired('Password')
});

const UserForm = (props) => {
    const handleSubmit = (values) => {
        props.data.errorCode = 0;
        props.data.errorMessage = 0;
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
                dirtySinceLastSubmit,
                values
            }) => (
                <Form size='big' onSubmit={handleSubmit} error>
                    <Header
                        as='h2'
                        content='Register'
                        color='blue'
                        textAlign='left'
                    />
                    <div className='field-container'>
                        <Field
                            name='username' 
                            component={TextInput}
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            initialValue={props.data.username}
                            />
                        {props.data.errorCode === 2 && 
                        <Label 
                            className='error-messsage-container' 
                            basic 
                            size='small'
                            color='red' 
                            pointing
                            >{props.data.errorMessage}</Label>}
                    </div>
                    <div className='field-container'>
                        <Field
                            name='email' 
                            component={TextInput}
                            icon='at'
                            iconPosition='left'
                            initialValue={props.data.email}
                            placeholder='Email' />
                        {props.data.errorCode === 1 && 
                        <Label 
                            className='error-messsage-container' 
                            basic 
                            size='small'
                            color='red' 
                            pointing
                        >{props.data.errorMessage}</Label>}
                    </div>
                    <div className='field-container'>
                        <Field
                            name='password'
                            component={TextInput}
                            icon='lock'
                            iconPosition='left'
                            initialValue={props.data.password}
                            placeholder='Password'
                            type='password'
                        />
                        {props.data.errorCode === 3 && 
                        <Label 
                            className='error-messsage-container pw-error' 
                            basic 
                            size='small'
                            color='red' 
                            pointing
                            >
                                {props.data.errorMessage[0]}<br/>
                                {props.data.errorMessage[1]}<br/>
                                {props.data.errorMessage[2]}<br/>
                                {props.data.errorMessage[3]}<br/>
                            </Label>}
                    </div>
                    {submitError && !dirtySinceLastSubmit && (
                        <ErrorMessage
                        error={submitError}
                        text='Invalid email or password'
                        />
                    )}
                    <Button animated
                        disabled={invalid && !dirtySinceLastSubmit}
                        loading={submitting}
                        primary
                        circular
                        size='big'
                        floated='right'
                        >
                            <Button.Content visible>Next</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>

                    </Button>
                </Form>
            )}
            />
    )
}

export default UserForm;