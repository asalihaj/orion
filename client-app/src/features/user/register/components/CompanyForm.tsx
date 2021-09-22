import { FORM_ERROR } from 'final-form';
import { useContext } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Header, Icon } from 'semantic-ui-react';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import { TextAreaInput } from '../../../../app/common/form/TextAreaInput';
import TextInput from '../../../../app/common/form/TextInput';
import { CompanyFormValues } from '../../../../app/models/company';
import { IUserFormValues } from '../../../../app/models/user';
import { RootStoreContext } from '../../../../app/stores/rootStore';

const validate = combineValidators({
    name: isRequired('Name'),
    location: isRequired('Location'),
    description: isRequired('Description')
});

const CompanyForm = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { register, getUser } = rootStore.userStore;
    const { create } = rootStore.companyStore;
    
    const handleSubmit = (values) => {
        const user: IUserFormValues = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        const result = register(user);

        result.then(data => {
            const profile: CompanyFormValues = {
                userId: data.id,
                name: values.name,
                location: values.location,
                description: values.description
            }
            create(profile)
            .then(() => getUser())
            .catch(error => ({
                [FORM_ERROR]: error
            }))
        }).catch(error => ({
            [FORM_ERROR]: error
        }));;
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