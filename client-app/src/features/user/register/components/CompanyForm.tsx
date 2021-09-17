import { Formik } from 'formik';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Header, Icon } from 'semantic-ui-react';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import FileInput from '../../../../app/common/form/FileInput';
import { TextAreaInput } from '../../../../app/common/form/TextAreaInput';
import TextInput from '../../../../app/common/form/TextInput';

const validate = combineValidators({
    name: isRequired('Name'),
    location: isRequired('Location'),
    description: isRequired('Description')
});

const CompanyForm = (props) => {
    const handleSubmit = (values) => {
        props.next(values, true);
    }
    
    return (
        <FinalForm
        onSubmit={handleSubmit}
        initialValues={props.data}
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
                <Field
                    name='name' 
                    component={TextInput} 
                    icon='group'
                    iconPosition='left'
                    initialValue={props.data.name}
                    placeholder='Name' />
                <Field
                    name='location' 
                    component={TextInput}
                    icon='map marker alternate'
                    iconPosition='left'
                    initialValue={props.data.location}
                    placeholder='Location' />
                <Field
                    name='description'
                    component={TextAreaInput}
                    rows={6}
                    initialValue={props.data.description}
                    placeholder='Description'
                />
                {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage
                    error={submitError}
                    text='Invalid data'
                    />
                )}
                <Button
                    disabled={invalid}
                    loading={submitting}
                    type='submit'
                    floated='right'
                    color='linkedin'
                    size='large'
                    circular>
                    Register
                    <Icon name='sign-in' corner='top right' />
                    </Button>
                <Button
                    onClick={() => props.prev(values)}
                    loading={submitting}
                    color='instagram'
                    floated='right'
                    size='large'
                    circular
                >
                    Back
                </Button>
                    
            </Form>
        )}
        />
    )
}

export default CompanyForm;