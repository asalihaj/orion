import { FORM_ERROR } from 'final-form';
import { useContext, useState } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Header, Icon } from 'semantic-ui-react';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import { modules, formats } from '../../../../app/common/options/quill/quillOptions';
import TextInput from '../../../../app/common/form/TextInput';
import { ICompanyFormValues } from '../../../../app/models/company';
import { IUserFormValues } from '../../../../app/models/user';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import ReactQuill from 'react-quill';

const validate = combineValidators({
    name: isRequired('Name'),
    location: isRequired('Location')
});

const CompanyForm = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { setToken } = rootStore.commonStore;
    const { register, getUser } = rootStore.userStore;
    const { create } = rootStore.companyStore;

    const [ description, setDescription] = useState('');

    const handleChange = (e) => {
        setDescription(e);
    }
    
    const handleSubmit = (values) => {
        const user: IUserFormValues = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        const result = register(user);

        result.then(data => {
            const profile: ICompanyFormValues = {
                id: data.id,
                name: values.name,
                location: values.location,
                description: description
            }
            create(profile)
                .then(() => setToken(data.token))
                .finally(() => getUser())
            .catch(error => ({
                [FORM_ERROR]: error
            }))
        }).catch(error => {
            const errorType = error.data.errors;
            if(errorType.Email) {
                values.errorCode = 1;
                values.errorMessage = errorType.Email;
            } else if (errorType.Username) {
                values.errorCode = 2;
                values.errorMessage = errorType.Username;
            } else if (errorType.Password) {
                values.errorCode = 3;
                values.errorMessage = errorType.Password;
            } else {
                values.errorCode = 4;
                values.errorMessage = 'Something went wrong during registration'
            }
            console.log("USER ERROR:: " + error);
            props.prev(values);
        });;
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
                <ReactQuill 
                    className='margin-bottom'
                    theme="snow" 
                    value={description} 
                    placeholder='Write description here... (optional)'
                    modules={modules}
                    formats={formats}
                    onChange={handleChange}
                />
                {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage
                    error={submitError}
                    text='Invalid data'
                    />
                )}
                <Button
                    animated
                    disabled={invalid}
                    loading={submitting}
                    type='submit'
                    floated='right'
                    primary
                    size='large'
                    circular>
                        <Button.Content visible>Register</Button.Content>
                        <Button.Content hidden>
                        <Icon name='sign-in' corner='top right' />
                        </Button.Content>
                </Button>
                <Button 
                    animated
                    onClick={() => props.prev(values)}
                    loading={submitting}
                    color='instagram'
                    floated='right'
                    size='large'
                    circular
                >
                    <Button.Content visible>Back</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
                    
            </Form>
        )}
        />
    )
}

export default CompanyForm;